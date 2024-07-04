import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { ContactFace } from '../../contact-faces/entities/contact-face.entity';
import { DefaultColumns } from '../../shared/entities/default-columns.entity';

@Entity()
export class ContactFacePosition extends DefaultColumns {
  /**
   * Название должности
   */
  @Column()
  name: string;

  @ApiHideProperty()
  @OneToMany(
    () => ContactFace,
    (contactFace: ContactFace) => contactFace.position,
  )
  contactFaces?: ContactFace[];
}
