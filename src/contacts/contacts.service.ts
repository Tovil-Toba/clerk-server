import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { DeleteResultDto } from '../shared/dto/delete-result.dto';
import { QueryFieldsService } from '../shared/services/query-fields.service';
import { CONTACTS_QUERY_FIELDS } from './constants/contacts-query-fields';
import { CreateContactDto } from './dto/create-contact.dto';
import { FindAllContactsDto } from './dto/find-all-contacts.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly queryFieldsService: QueryFieldsService<Contact>,
  ) {}

  create(createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactRepository.save(createContactDto);
  }

  async findAll(query: object): Promise<FindAllContactsDto> {
    const options: FindManyOptions<Contact> = {
      select: {
        company: {
          id: true,
          name: true,
        },
        contactFace: {
          id: true,
          name: {
            first: true,
            middle: true,
            last: true,
          },
        },
        manager: {
          id: true,
          name: {
            first: true,
            middle: true,
            last: true,
          },
        },
      },
      relations: {
        company: true,
        contactFace: true,
        manager: true,
      },
      ...this.queryFieldsService.getFindManyOptions(
        query,
        CONTACTS_QUERY_FIELDS,
      ),
    };

    const count = await this.contactRepository.count(options);
    const items = await this.contactRepository.find(options);

    return {
      count,
      items,
    };
  }

  findOne(id: number): Promise<Contact | null> {
    return this.contactRepository.findOne({
      where: { id },
      relations: {
        company: true,
        contactFace: true,
        manager: true,
      },
    });
  }

  remove(id: number): Promise<DeleteResultDto> {
    return this.contactRepository.delete(id);
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    await this.contactRepository.update(id, updateContactDto);

    return this.findOne(id);
  }
}
