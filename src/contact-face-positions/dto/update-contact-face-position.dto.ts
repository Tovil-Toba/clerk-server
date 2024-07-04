import { PartialType } from '@nestjs/mapped-types';

import { CreateContactFacePositionDto } from './create-contact-face-position.dto';

export class UpdateContactFacePositionDto extends PartialType(
  CreateContactFacePositionDto,
) {}
