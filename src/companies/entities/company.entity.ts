import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { CompanyCategory } from '../../company-categories/entities/company-category.entity';
import { ContactFace } from '../../contact-faces/entities/contact-face.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Manager } from '../../managers/entities/manager.entity';
import { DefaultColumns } from '../../shared/entities/default-columns.entity';

@Entity()
export class Company extends DefaultColumns {
  /**
   * Идентификатор категории
   */
  @Column({ nullable: true, default: null })
  categoryId?: null | number;

  /**
   * Категория
   */
  @ManyToOne(
    () => CompanyCategory,
    (category: CompanyCategory) => category.companies,
    {
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn()
  category?: CompanyCategory;

  /**
   * Адреса электронных почт
   */
  @Column('text')
  emails?: string;

  /**
   * Сфера деятельности
   */
  @Column()
  fieldOfActivity?: string;

  /**
   * Идентификатор менеджера
   */
  @Column({ nullable: true, default: null })
  managerId?: null | number;

  /**
   * Менеджер
   */
  @ManyToOne(() => Manager, (manager: Manager) => manager.companies, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  manager?: Manager;

  /**
   * Название компании
   */
  @Column()
  name: string;

  /**
   * Примечания
   */
  @Column('text')
  notes?: string;

  /**
   * Расположение офиса
   */
  @Column()
  officeAddress?: string;

  /**
   * Телефоны
   */
  @Column('text')
  phones?: string;

  /**
   * Издания
   */
  @Column()
  publications?: string;

  /**
   * Почтовый адрес
   */
  @Column()
  postalAddress?: string;

  /**
   * Ссылки
   */
  @Column('text')
  urls?: string;

  /**
   * Время работы
   */
  @Column()
  workTime?: string;

  @ApiHideProperty()
  @OneToMany(
    () => ContactFace,
    (contactFace: ContactFace) => contactFace.company,
  )
  contactFaces?: ContactFace[];

  @ApiHideProperty()
  @OneToMany(() => Contact, (contact: Contact) => contact.company)
  contacts?: Contact[];
}
