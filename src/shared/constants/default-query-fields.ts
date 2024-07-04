import { QueryField } from '../models/query-field.model';

export const DEFAULT_QUERY_FIELDS: QueryField[] = [
  {
    path: 'id',
    filterType: 'number',
    description: 'Идентификатор',
  },
  {
    path: 'isActive',
    filterType: 'boolean',
    description: 'Активная',
  },
  {
    path: 'createdAt',
    filterType: 'date',
    description: 'Дата создания',
    // example: '2021-05-18T10:20:28.017Z',
  },
  {
    path: 'updatedAt',
    filterType: 'date',
    description: 'Дата обновления',
    // example: '2021-05-18T10:20:28.017Z',
  },
];
