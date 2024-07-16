import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';

import { FilterType } from './filter-type.model';

export interface QueryField {
  description?: string;
  enum?: SwaggerEnumType;
  example?: string;
  filterType?: FilterType;
  isDisabled?: boolean;
  isFilterDisabled?: boolean;
  isOrderDisabled?: boolean;
  path: string;
  required?: boolean;
}
