import { DEFAULT_QUERY_FIELDS } from '../../shared/constants/default-query-fields';
import { QueryField } from '../../shared/models/query-field.model';

export const COMPANY_CATEGORIES_QUERY_FIELDS: QueryField[] = [
  {
    path: 'name',
    description: 'Название категории',
  },
  ...DEFAULT_QUERY_FIELDS,
];
