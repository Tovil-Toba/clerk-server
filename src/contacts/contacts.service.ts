import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import { QueryFieldsService } from '../shared/services/query-fields.service';
import { CONTACTS_QUERY_FIELDS } from './constants/contacts-query-fields';
import { CreateContactDto } from './dto/create-contact.dto';
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

  findAll(query: object): Promise<Contact[]> {
    const options: FindManyOptions<Contact> =
      this.queryFieldsService.getFindManyOptions(query, CONTACTS_QUERY_FIELDS);

    return this.contactRepository.find({
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
      ...options,
    });
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

  update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<UpdateResult> {
    return this.contactRepository.update(id, updateContactDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.contactRepository.delete(id);
  }
}
