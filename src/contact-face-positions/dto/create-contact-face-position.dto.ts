import { OmitType } from '@nestjs/swagger';

import { ContactFacePosition } from '../entities/contact-face-position.entity';

export class CreateContactFacePositionDto extends OmitType(
  ContactFacePosition,
  ['id'] as const,
) {}
