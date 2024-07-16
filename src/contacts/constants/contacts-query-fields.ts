import { DEFAULT_QUERY_FIELDS } from '../../shared/constants/default-query-fields';
import { QueryField } from '../../shared/models/query-field.model';
import { ContactStatusEnum } from '../enums/contact-status.enum';

export const CONTACTS_QUERY_FIELDS: QueryField[] = [
  {
    path: 'company.name',
    description: 'Название компании',
    filterType: 'string',
  },
  {
    path: 'companyId',
    description: 'Идентификатор компании',
    filterType: 'number',
  },
  {
    path: 'contactFace.name.first',
    description: 'Имя контактного лица',
    filterType: 'string',
  },
  {
    path: 'contactFace.name.last',
    description: 'Фамилия контактного лица',
    filterType: 'string',
  },
  {
    path: 'contactFace.name.middle',
    description: 'Отчество контактного лица',
    filterType: 'string',
  },
  {
    path: 'contactFaceId',
    description: 'Идентификатор контактного лица',
    filterType: 'number',
  },
  {
    path: 'contactDate',
    description: 'Дата контакта',
    filterType: 'date',
  },
  {
    path: 'description',
    description: 'Описание',
    filterType: 'string',
  },
  {
    path: 'manager.name.first',
    description: 'Имя менеджера',
    filterType: 'string',
  },
  {
    path: 'manager.name.last',
    description: 'Фамилия менеджера',
    filterType: 'string',
  },
  {
    path: 'manager.name.middle',
    description: 'Отчество менеджера',
    filterType: 'string',
  },
  {
    path: 'managerId',
    description: 'Идентификатор менеджера',
    filterType: 'number',
  },
  {
    path: 'nextContactDate',
    description: 'Дата следующего контакта',
    filterType: 'date',
  },
  {
    path: 'offer.name',
    description: 'Предложение',
    filterType: 'string',
  },
  {
    path: 'phones',
    description: 'Телефоны',
    filterType: 'string',
  },
  {
    path: 'status',
    description: 'Статус',
    enum: ContactStatusEnum,
  },
  ...DEFAULT_QUERY_FIELDS,
];
