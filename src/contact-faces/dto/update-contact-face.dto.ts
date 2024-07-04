import { PartialType } from '@nestjs/mapped-types';

import { CreateContactFaceDto } from './create-contact-face.dto';

export class UpdateContactFaceDto extends PartialType(CreateContactFaceDto) {}
