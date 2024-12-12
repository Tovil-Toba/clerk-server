import { OmitType } from '@nestjs/swagger';

import { ContactFacePosition } from '../entities/contact-face-position.entity';

export class CreateContactFacePositionDto extends OmitType(
  ContactFacePosition,
  ['createdAt', 'id', 'updatedAt'] as const,
) {}
