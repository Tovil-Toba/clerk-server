import { OmitType } from '@nestjs/swagger';

import { ContactFace } from '../entities/contact-face.entity';

export class CreateContactFaceDto extends OmitType(ContactFace, [
  'id',
  'position',
] as const) {}
