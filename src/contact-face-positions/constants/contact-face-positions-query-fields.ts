import { DEFAULT_QUERY_FIELDS } from '../../shared/constants/default-query-fields';
import { QueryField } from '../../shared/models/query-field.model';

export const CONTACT_FACE_POSITIONS_QUERY_FIELDS: QueryField[] = [
  {
    path: 'name',
    description: 'Название должности',
  },
  ...DEFAULT_QUERY_FIELDS,
];
