import { PartialType } from '@nestjs/swagger';

import { CreateContactFaceDto } from './create-contact-face.dto';

export class UpdateContactFaceDto extends PartialType(CreateContactFaceDto) {}
