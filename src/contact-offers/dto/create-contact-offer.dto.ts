import { OmitType } from '@nestjs/swagger';

import { ContactOffer } from '../entities/contact-offer.entity';

export class CreateContactOfferDto extends OmitType(ContactOffer, [
  'createdAt',
  'id',
  'updatedAt',
] as const) {}
