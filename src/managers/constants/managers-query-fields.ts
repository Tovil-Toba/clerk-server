import { DEFAULT_QUERY_FIELDS } from '../../shared/constants/default-query-fields';
import { QueryField } from '../../shared/models/query-field.model';

export const MANAGERS_QUERY_FIELDS: QueryField[] = [
  {
    path: 'email',
    description: 'Электронная почта',
    filterType: 'string',
  },
  {
    path: 'name.first',
    description: 'Имя',
    filterType: 'string',
  },
  {
    path: 'name.last',
    description: 'Фамилия',
    filterType: 'string',
  },
  {
    path: 'name.middle',
    description: 'Отчество',
    filterType: 'string',
  },
  {
    path: 'phone',
    description: 'Телефон',
    filterType: 'string',
  },
  ...DEFAULT_QUERY_FIELDS,
];
