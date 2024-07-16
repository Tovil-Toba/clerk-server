import { Injectable } from '@nestjs/common';
import { addDays, getSeconds, isValid, toDate } from 'date-fns';
import { set, sortBy, toNumber } from 'lodash';
import {
  Between,
  Equal,
  FindManyOptions,
  FindOperator,
  FindOptionsWhere,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Or,
} from 'typeorm';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';

import {
  QUERY_FIELD_FILTER_POSTFIX,
  QUERY_FIELD_ORDER_PLACE_POSTFIX,
  QUERY_FIELD_ORDER_POSTFIX,
} from '../constants/query-field-postfixes';
import { BooleanFilterEnum } from '../models/boolean-filter.enum';
import { DateFilterEnum } from '../models/date-filter.enum';
import { FilterType } from '../models/filter-type.model';
import { NumberFilterEnum } from '../models/number-filter.enum';
import { OrderValue } from '../models/order-value.model';
import { QueryField } from '../models/query-field.model';
import { StringFilterEnum } from '../models/string-filter.enum';

@Injectable()
export class QueryFieldsService<Entity> {
  getFindManyOptions(
    query: object,
    queryFields: QueryField[],
  ): FindManyOptions<Entity> {
    const order: FindOptionsOrder<Entity> = this.getFindOptionsOrder(
      query,
      queryFields,
    );

    const where: FindOptionsWhere<Entity> = this.getFindOptionsWhere(
      query,
      queryFields,
    );

    let skip: number | undefined = parseInt(query?.['offset']) || 0;
    let take: number | undefined = parseInt(query?.['limit']) || 0;

    if (skip < 0 || take <= 0) {
      skip = undefined;
      take = undefined;
    }

    return {
      order,
      where,
      skip,
      take,
    };
  }

  getFindOptionsOrder(
    query: object,
    queryFields: QueryField[],
  ): FindOptionsOrder<Entity> {
    const findOptionsOrder: FindOptionsOrder<Entity> = {};

    const orderValues: OrderValue[] = [];

    queryFields.forEach((queryField: QueryField) => {
      if (queryField.isOrderDisabled) {
        return;
      }

      const path = queryField.path;
      const order = query?.[path + QUERY_FIELD_ORDER_POSTFIX]?.toUpperCase();

      if (order !== 'ASC' && order !== 'DESC') {
        return;
      }

      const orderPlace =
        parseInt(query?.[path + QUERY_FIELD_ORDER_PLACE_POSTFIX]) || 0;

      orderValues.push({ path, order, orderPlace });
    });

    const sortedOrderValues: OrderValue[] = sortBy(orderValues, ['orderPlace']);

    sortedOrderValues.forEach(
      ({ path, order }: { path: string; order: 'ASC' | 'DESC' }) => {
        set(findOptionsOrder, path, order);
      },
    );

    return findOptionsOrder;
  }

  getFindOptionsWhere(
    query: object,
    queryFields: QueryField[],
  ): FindOptionsWhere<Entity> {
    const findOptionsWhere: FindOptionsWhere<Entity> = {};

    queryFields.forEach((queryField: QueryField) => {
      const path = queryField.path;
      const value: string | undefined = query?.[path]?.trim();

      if (!value) {
        return;
      }

      if (queryField.isFilterDisabled) {
        return;
      }

      if (queryField.enum) {
        set(findOptionsWhere, path, Equal(value));

        return;
      }

      const filterType: FilterType = queryField.filterType;
      const filter: string | undefined =
        query?.[path + QUERY_FIELD_FILTER_POSTFIX]?.toUpperCase();

      switch (filterType) {
        case 'boolean':
          this.setBooleanFilter(findOptionsWhere, path, value);
          break;
        case 'date':
          this.setDateFilter(findOptionsWhere, path, value, filter);
          break;
        case 'number':
          this.setNumberFilter(findOptionsWhere, path, value, filter);
          break;
        case 'string':
        default:
          this.setStringFilter(findOptionsWhere, path, value, filter);
          break;
      }
    });

    return findOptionsWhere;
  }

  private setBooleanFilter(
    findOptionsWhere: FindOptionsWhere<Entity>,
    path: string,
    queryValue: string,
  ): void {
    const value = queryValue.toUpperCase();

    if (value !== BooleanFilterEnum.False && value !== BooleanFilterEnum.True) {
      return;
    }

    set(
      findOptionsWhere,
      path,
      Equal(value === BooleanFilterEnum.False ? 0 : 1),
    );
  }

  private setDateFilter(
    findOptionsWhere: FindOptionsWhere<Entity>,
    path: string,
    value: string,
    filter?: string,
  ): void {
    let findOperator: FindOperator<Date | string>;

    const values: string[] = value
      .split(',')
      .map((_value: string) => _value.trim());

    const isInvalidValues = !!values.find((_value) => !isValid(toDate(_value)));

    if (isInvalidValues) {
      return;
    }

    switch (filter) {
      case DateFilterEnum.Between:
        if (values.length !== 2) {
          return;
        }

        const dateFrom: Date = toDate(values[0]);
        let dateTo: Date = toDate(values[1]);

        if (!isValid(dateFrom) || !isValid(dateTo)) {
          return;
        }

        if (getSeconds(dateTo) === 0) {
          dateTo = addDays(dateTo, 1);
        }

        findOperator = Between(dateFrom, dateTo);
        break;
      case DateFilterEnum.In:
        findOperator = Or(...values.map((_value) => Like(`${_value}%`)));
        break;
      case DateFilterEnum.LessThan:
        findOperator = LessThan(value);
        break;
      case DateFilterEnum.LessThanOrEqual:
        findOperator = LessThanOrEqual(value);
        break;
      case DateFilterEnum.MoreThan:
        findOperator = MoreThan(value);
        break;
      case DateFilterEnum.MoreThanOrEqual:
        findOperator = MoreThanOrEqual(value);
        break;
      case DateFilterEnum.NotEquals:
        // подразумевается формат YYYY-MM-DD
        if (value.length === 10) {
          findOperator = Not(Like(`${value}%`));
        } else {
          findOperator = Not(value);
        }

        break;
      case DateFilterEnum.StartsWith:
        findOperator = Like(`${value}%`);
        break;
      case DateFilterEnum.Equals:
      default:
        // подразумевается формат YYYY-MM-DD
        if (value.length === 10) {
          findOperator = Like(`${value}%`);
        } else {
          findOperator = Equal(value);
        }
        break;
    }

    if (!findOperator) {
      return;
    }

    set(findOptionsWhere, path, findOperator);
  }

  private setNumberFilter(
    findOptionsWhere: FindOptionsWhere<Entity>,
    path: string,
    queryValue: string,
    filter?: string,
  ): void {
    let findOperator: FindOperator<number>;

    const values: number[] = queryValue
      .split(',')
      .map((value: string) => toNumber(value.trim()));

    const isInvalidValues = !!values.find((value) => isNaN(value));

    if (isInvalidValues) {
      return;
    }

    const value = values[0];

    switch (filter) {
      case NumberFilterEnum.Between:
        if (values.length === 2) {
          findOperator = Between(values[0], values[1]);
        }

        break;
      case NumberFilterEnum.In:
        findOperator = In(values);
        break;
      case NumberFilterEnum.LessThan:
        findOperator = LessThan(value);
        break;
      case NumberFilterEnum.LessThanOrEqual:
        findOperator = LessThanOrEqual(value);
        break;
      case NumberFilterEnum.MoreThan:
        findOperator = MoreThan(value);
        break;
      case NumberFilterEnum.MoreThanOrEqual:
        findOperator = MoreThanOrEqual(value);
        break;
      case NumberFilterEnum.NotEquals:
        findOperator = Not(value);
        break;
      case NumberFilterEnum.Equals:
      default:
        findOperator = Equal(value);
        break;
    }

    if (!findOperator) {
      return;
    }

    set(findOptionsWhere, path, findOperator);
  }

  private setStringFilter(
    findOptionsWhere: FindOptionsWhere<Entity>,
    path: string,
    value: string,
    filter?: string,
  ): void {
    let findOperator: FindOperator<string>;

    const values: string[] = value
      .split(',')
      .map((_value: string) => _value.trim());

    switch (filter) {
      case StringFilterEnum.Contains:
        findOperator = ILike(`%${value}%`);
        break;
      case StringFilterEnum.EndsWith:
        findOperator = ILike(`%${value}`);
        break;
      case StringFilterEnum.In:
        findOperator = In(values);
        break;
      case StringFilterEnum.NotContains:
        findOperator = Not(ILike(`%${value}%`));
        break;
      case StringFilterEnum.NotEquals:
        findOperator = Not(value);
        break;
      case StringFilterEnum.StartsWith:
        findOperator = ILike(`${value}%`);
        break;
      case StringFilterEnum.Equals:
      default:
        findOperator = Equal(value);
        break;
    }

    if (!findOperator) {
      return;
    }

    set(findOptionsWhere, path, findOperator);
  }
}
