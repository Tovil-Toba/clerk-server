import { PartialType } from '@nestjs/mapped-types';

import { CreateContactOfferDto } from './create-contact-offer.dto';

export class UpdateContactOfferDto extends PartialType(CreateContactOfferDto) {}
