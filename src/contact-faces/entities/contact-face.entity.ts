import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Company } from '../../companies/entities/company.entity';
import { ContactFacePosition } from '../../contact-face-positions/entities/contact-face-position.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { DefaultColumns } from '../../shared/entities/default-columns.entity';
import { Name } from '../../shared/entities/name.entity';

@Entity()
export class ContactFace extends DefaultColumns {
  /**
   * Идентификатор компании
   */
  @Column()
  companyId: number;

  /**
   * Адрес электронной почты
   */
  @Column('text')
  email?: string;

  /**
   * ФИО
   */
  @Column(() => Name)
  name: Name;

  /**
   * Заметки
   */
  @Column('text')
  notes?: string;

  /**
   * Телефон
   */
  @Column('text')
  phone?: string;

  /**
   * Должность
   */
  @ManyToOne(
    () => ContactFacePosition,
    (contactFacePosition: ContactFacePosition) =>
      contactFacePosition.contactFaces,
    {
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn()
  position?: ContactFacePosition;

  /**
   * Идентификатор должности
   */
  @Column({
    nullable: true,
    default: null,
  })
  positionId?: null | number;

  /**
   * Компания
   */
  @ManyToOne(() => Company, (company: Company) => company.contactFaces, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @ApiHideProperty()
  @OneToMany(() => Contact, (contact: Contact) => contact.contactFace)
  contacts?: Contact[];
}
