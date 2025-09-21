import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Company } from '../../companies/entities/company.entity';
import { ContactFacePosition } from '../../contact-face-positions/entities/contact-face-position.entity';
import { ContactFace } from '../../contact-faces/entities/contact-face.entity';
import { ContactOffer } from '../../contact-offers/entities/contact-offer.entity';
import { Manager } from '../../managers/entities/manager.entity';
import { DefaultColumns } from '../../shared/entities/default-columns.entity';
import { ContactStatusEnum } from '../enums/contact-status.enum';

@Entity()
export class Contact extends DefaultColumns {
  /**
   * Идентификатор компании
   */
  @Column()
  companyId: number;

  /**
   * Компания
   */
  @JoinColumn()
  @ManyToOne(() => Company, (company: Company) => company.contactFaces, {
    onDelete: 'CASCADE',
  })
  company: Company;

  /**
   * Дата контакта
   */
  @Column({ nullable: true })
  contactDate?: Date;

  /**
   * Идентификатор контактного лица
   */
  @Column({ nullable: true, default: null })
  contactFaceId?: null | number;

  /**
   * Контактное лицо
   */
  @ManyToOne(
    () => ContactFace,
    (contactFace: ContactFace) => contactFace.contacts,
    {
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn()
  contactFace?: ContactFace;

  /**
   * Описание
   */
  @Column('text')
  description?: string;

  /**
   * Адреса электронных почт
   */
  @Column('text')
  emails?: string;

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
   * Дата следующего контакта
   */
  @Column({ nullable: true })
  nextContactDate?: Date;

  /**
   * Примечания по контактному лицу
   */
  @Column('text')
  notesOnContactFace?: string;

  /**
   * Идентификатор предложения
   */
  @Column({ nullable: true, default: null })
  offerId?: null | number;

  /**
   * Предложение
   */
  @ManyToOne(
    () => ContactOffer,
    (contactOffer: ContactOffer) => contactOffer.contacts,
    {
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn()
  offer?: ContactFacePosition;

  /**
   * Контактные телефоны
   */
  @Column('text')
  phones?: string;

  /**
   * Состояние
   */
  @Column({
    type: 'enum',
    enum: ContactStatusEnum,
    default: ContactStatusEnum.Planning,
  })
  status: ContactStatusEnum;
}
