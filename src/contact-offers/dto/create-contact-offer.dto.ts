import { OmitType } from '@nestjs/swagger';

import { ContactOffer } from '../entities/contact-offer.entity';

export class CreateContactOfferDto extends OmitType(ContactOffer, [
  'id',
] as const) {}
