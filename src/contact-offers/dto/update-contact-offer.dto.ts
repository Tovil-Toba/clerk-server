import { PartialType } from '@nestjs/swagger';

import { CreateContactOfferDto } from './create-contact-offer.dto';

export class UpdateContactOfferDto extends PartialType(CreateContactOfferDto) {}
