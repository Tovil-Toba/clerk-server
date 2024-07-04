import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { sortBy } from 'lodash';

import {
  QUERY_FIELD_FILTER_POSTFIX,
  QUERY_FIELD_ORDER_PLACE_POSTFIX,
  QUERY_FIELD_ORDER_POSTFIX,
} from '../constants/query-field-postfixes';
import { BooleanFilterEnum } from '../models/boolean-filter.enum';
import { DateFilterEnum } from '../models/date-filter.enum';
import { FilterEnumType } from '../models/filter-enum-type.model';
import { FilterType } from '../models/filter-type.model';
import { NumberFilterEnum } from '../models/number-filter.enum';
import { OrderEnum } from '../models/order.enum';
import { QueryField } from '../models/query-field.model';
import { StringFilterEnum } from '../models/string-filter.enum';

export const ApiFieldsQuery = (queryFields: QueryField[]) => {
  const decorators: PropertyDecorator[] = [];
  const sortedQueryFields: QueryField[] = sortBy(queryFields, ['path']);

  sortedQueryFields.forEach((queryField: QueryField) => {
    if (queryField?.isDisabled) {
      return;
    }

    if (!queryField?.isFilterDisabled) {
      const enumType: FilterEnumType = getFilterEnumType(queryField.filterType);
      const enumName = getFilterEnumName(queryField.filterType);

      if (queryField.filterType === 'boolean') {
        const fieldDecorator = ApiQuery({
          name: queryField.path,
          type: String,
          enum: enumType,
          enumName,
          explode: false,
          required: !!queryField.required,
          description:
            queryField.description && `**${queryField.description}**`,
          example: queryField.example,
        });

        decorators.push(fieldDecorator);
      } else {
        const fieldDecorator = ApiQuery({
          name: queryField.path,
          type: String,
          explode: false,
          required: !!queryField.required,
          description:
            queryField.description && `**${queryField.description}**`,
          example: queryField.example,
        });

        const fieldFilterDecorator = ApiQuery({
          name: `${queryField.path}${QUERY_FIELD_FILTER_POSTFIX}`,
          type: String,
          enum: enumType,
          enumName,
          explode: false,
          required: false,
          description: 'Фильтр',

          /*description:
            'Тип фильтра: начинается с, содержит, не содержит, заканчивается, равно, не равно.' +
            ' Если тип фильтра не выбран, соответствующее поле не будет учитываться',*/
        });

        decorators.push(fieldDecorator, fieldFilterDecorator);
      }
    }

    if (!queryField?.isOrderDisabled) {
      const fieldOrderDecorator = ApiQuery({
        name: `${queryField.path}${QUERY_FIELD_ORDER_POSTFIX}`,
        type: String,
        enum: OrderEnum,
        enumName: 'OrderEnum',
        explode: false,
        required: false,
        description: 'Порядок сортировки',
      });

      const fieldOrderPlaceDecorator = ApiQuery({
        name: `${queryField.path}${QUERY_FIELD_ORDER_PLACE_POSTFIX}`,
        type: Number,
        required: false,
        description: 'Приоритет сортировки  \n*Чем меньше, тем приоритетнее*',
      });

      decorators.push(fieldOrderDecorator, fieldOrderPlaceDecorator);
    }
  });

  const offsetDecorator = ApiQuery({
    name: 'offset', // skip
    type: Number,
    required: false,
    description:
      '**Смещение**  \n*Без заданного ограничения работать не будет*',
  });

  const limitDecorator = ApiQuery({
    name: 'limit', // take
    type: Number,
    required: false,
    description: '**Ограничение**',
  });

  decorators.push(offsetDecorator, limitDecorator);

  return applyDecorators(...decorators);
};

function getFilterEnumType(filterType: FilterType): FilterEnumType {
  switch (filterType) {
    case 'boolean':
      return BooleanFilterEnum;
    case 'date':
      return DateFilterEnum;
    case 'number':
      return NumberFilterEnum;
    case 'string':
    default:
      return StringFilterEnum;
  }
}

function getFilterEnumName(filterType: FilterType): string {
  switch (filterType) {
    case 'boolean':
      return 'BooleanFilterEnum';
    case 'date':
      return 'DateFilterEnum';
    case 'number':
      return 'NumberFilterEnum';
    case 'string':
    default:
      return 'StringFilterEnum';
  }
}
