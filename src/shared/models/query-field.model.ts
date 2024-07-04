import { FilterType } from './filter-type.model';

export interface QueryField {
  description?: string;
  example?: string;
  filterType?: FilterType;
  isDisabled?: boolean;
  isFilterDisabled?: boolean;
  isOrderDisabled?: boolean;
  path: string;
  required?: boolean;
}
