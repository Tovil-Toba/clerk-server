import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import { QueryFieldsService } from '../shared/services/query-fields.service';
import { CONTACT_OFFERS_QUERY_FIELDS } from './constants/contact-offers-query-fields';
import { CreateContactOfferDto } from './dto/create-contact-offer.dto';
import { UpdateContactOfferDto } from './dto/update-contact-offer.dto';
import { ContactOffer } from './entities/contact-offer.entity';

@Injectable()
export class ContactOffersService {
  constructor(
    @InjectRepository(ContactOffer)
    private readonly contactOfferRepository: Repository<ContactOffer>,
    private readonly queryFieldsService: QueryFieldsService<ContactOffer>,
  ) {}

  create(createContactOfferDto: CreateContactOfferDto): Promise<ContactOffer> {
    return this.contactOfferRepository.save(createContactOfferDto);
  }

  findAll(query: object): Promise<ContactOffer[]> {
    const options: FindManyOptions<ContactOffer> =
      this.queryFieldsService.getFindManyOptions(
        query,
        CONTACT_OFFERS_QUERY_FIELDS,
      );

    return this.contactOfferRepository.find({
      ...options,
    });
  }

  findOne(id: number): Promise<ContactOffer | null> {
    return this.contactOfferRepository.findOne({
      where: { id },
    });
  }

  update(
    id: number,
    updateContactOfferDto: UpdateContactOfferDto,
  ): Promise<UpdateResult> {
    return this.contactOfferRepository.update(id, updateContactOfferDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.contactOfferRepository.delete(id);
  }
}
