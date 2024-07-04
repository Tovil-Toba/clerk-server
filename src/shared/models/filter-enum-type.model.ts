import { BooleanFilterEnum } from './boolean-filter.enum';
import { DateFilterEnum } from './date-filter.enum';
import { NumberFilterEnum } from './number-filter.enum';
import { StringFilterEnum } from './string-filter.enum';

export type FilterEnumType =
  | typeof BooleanFilterEnum
  | typeof DateFilterEnum
  | typeof NumberFilterEnum
  | typeof StringFilterEnum;
