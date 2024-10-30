import { PartialType } from '@nestjs/swagger';

import { CreateContactFacePositionDto } from './create-contact-face-position.dto';

export class UpdateContactFacePositionDto extends PartialType(
  CreateContactFacePositionDto,
) {}
