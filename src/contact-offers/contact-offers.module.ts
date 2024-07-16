import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueryFieldsService } from '../shared/services/query-fields.service';
import { ContactOffersController } from './contact-offers.controller';
import { ContactOffersService } from './contact-offers.service';
import { ContactOffer } from './entities/contact-offer.entity';

@Module({
  controllers: [ContactOffersController],
  imports: [TypeOrmModule.forFeature([ContactOffer])],
  providers: [ContactOffersService, QueryFieldsService],
})
export class ContactOffersModule {}
