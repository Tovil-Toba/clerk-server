import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { Contact } from '../../contacts/entities/contact.entity';
import { DefaultColumns } from '../../shared/entities/default-columns.entity';

@Entity()
export class ContactOffer extends DefaultColumns {
  /**
   * Название предложения
   */
  @Column()
  name: string;

  @ApiHideProperty()
  @OneToMany(() => Contact, (contact: Contact) => contact.offer)
  contacts?: Contact[];
}
