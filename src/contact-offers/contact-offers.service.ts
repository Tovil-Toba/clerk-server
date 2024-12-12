import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { DeleteResultDto } from '../shared/dto/delete-result.dto';
import { FindNamesResultDto } from '../shared/dto/find-names-result.dto';
import { QueryFieldsService } from '../shared/services/query-fields.service';
import { CONTACT_OFFERS_QUERY_FIELDS } from './constants/contact-offers-query-fields';
import { CreateContactOfferDto } from './dto/create-contact-offer.dto';
import { FindAllContactOffersDto } from './dto/find-all-contact-offers.dto';
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

  async findAll(query: object): Promise<FindAllContactOffersDto> {
    const options: FindManyOptions<ContactOffer> =
      this.queryFieldsService.getFindManyOptions(
        query,
        CONTACT_OFFERS_QUERY_FIELDS,
      );

    const count = await this.contactOfferRepository.count(options);
    const items = await this.contactOfferRepository.find(options);

    return {
      count,
      items,
    };
  }

  async findNames(): Promise<FindNamesResultDto> {
    const items = await this.contactOfferRepository.find({
      select: {
        id: true,
        name: true,
      },
      order: {
        name: 'ASC',
      },
    });

    return { items };
  }

  findOne(id: number): Promise<ContactOffer | null> {
    return this.contactOfferRepository.findOne({
      where: { id },
    });
  }

  remove(id: number): Promise<DeleteResultDto> {
    return this.contactOfferRepository.delete(id);
  }

  async update(
    id: number,
    updateContactOfferDto: UpdateContactOfferDto,
  ): Promise<ContactOffer> {
    await this.contactOfferRepository.update(id, updateContactOfferDto);

    return this.findOne(id);
  }
}
