import { DEFAULT_QUERY_FIELDS } from '../../shared/constants/default-query-fields';
import { QueryField } from '../../shared/models/query-field.model';

export const CONTACT_OFFERS_QUERY_FIELDS: QueryField[] = [
  {
    path: 'name',
    description: 'Название предложения',
  },
  ...DEFAULT_QUERY_FIELDS,
];
