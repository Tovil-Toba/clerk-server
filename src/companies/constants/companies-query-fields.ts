import { DEFAULT_QUERY_FIELDS } from '../../shared/constants/default-query-fields';
import { QueryField } from '../../shared/models/query-field.model';

export const COMPANIES_QUERY_FIELDS: QueryField[] = [
  {
    path: 'emails',
    description: 'Адреса электронных почт',
  },
  {
    path: 'category.name',
    description: 'Категория',
  },
  {
    path: 'categoryId',
    filterType: 'number',
    description: 'Идентификатор категории',
  },
  {
    path: 'fieldOfActivity',
    description: 'Сфера деятельности',
  },
  {
    path: 'manager.name.last',
    description: 'Фамилия менеджера',
  },
  {
    path: 'managerId',
    filterType: 'number',
    description: 'Идентификатор менеджера',
  },
  {
    path: 'name',
    description: 'Название компании',
  },
  {
    path: 'notes',
    description: 'Примечания',
  },
  {
    path: 'phones',
    description: 'Телефоны',
  },
  {
    description: 'Ссылки',
    path: 'urls',
  },
  {
    path: 'workTime',
    description: 'Время работы',
  },
  ...DEFAULT_QUERY_FIELDS,
];
