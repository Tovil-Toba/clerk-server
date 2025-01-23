import { DEFAULT_QUERY_FIELDS } from '../../shared/constants/default-query-fields';
import { QueryField } from '../../shared/models/query-field.model';

export const CONTACT_FACES_QUERY_FIELDS: QueryField[] = [
  {
    path: 'companyId',
    description: 'Идентификатор компании',
    filterType: 'number',
  },
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
    path: 'notes',
    description: 'Примечания',
    filterType: 'string',
  },
  {
    path: 'phone',
    description: 'Телефон',
    filterType: 'string',
  },
  {
    path: 'position.name',
    description: 'Должность',
    filterType: 'string',
  },
  {
    path: 'positionId',
    description: 'Идентификатор должности',
    filterType: 'number',
  },
  ...DEFAULT_QUERY_FIELDS,
];
