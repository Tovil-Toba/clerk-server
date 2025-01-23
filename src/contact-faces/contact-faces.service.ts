import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { DeleteResultDto } from '../shared/dto/delete-result.dto';
import { FindUserNamesResultDto } from '../shared/dto/find-user-names-result.dto';
import { QueryFieldsService } from '../shared/services/query-fields.service';
import { CONTACT_FACES_QUERY_FIELDS } from './constants/contact-faces-query-fields';
import { CreateContactFaceDto } from './dto/create-contact-face.dto';
import { FindAllContactFacesDto } from './dto/find-all-contact-faces.dto';
import { UpdateContactFaceDto } from './dto/update-contact-face.dto';
import { ContactFace } from './entities/contact-face.entity';

@Injectable()
export class ContactFacesService {
  constructor(
    @InjectRepository(ContactFace)
    private readonly contactFaceRepository: Repository<ContactFace>,
    private readonly queryFieldsService: QueryFieldsService<ContactFace>,
  ) {}

  create(createContactFaceDto: CreateContactFaceDto): Promise<ContactFace> {
    return this.contactFaceRepository.save(createContactFaceDto);
  }

  async findAll(query: object): Promise<FindAllContactFacesDto> {
    const options: FindManyOptions<ContactFace> = {
      relations: {
        company: true,
        position: true,
      },
      ...this.queryFieldsService.getFindManyOptions(
        query,
        CONTACT_FACES_QUERY_FIELDS,
      ),
    };

    const count = await this.contactFaceRepository.count(options);
    const items = await this.contactFaceRepository.find(options);

    return {
      count,
      items,
    };
  }

  async findNames(): Promise<FindUserNamesResultDto> {
    const items = await this.contactFaceRepository.find({
      select: {
        id: true,
        name: {
          last: true,
          first: true,
          middle: true,
        },
      },
      order: {
        name: {
          last: 'ASC',
          first: 'ASC',
          middle: 'ASC',
        },
      },
    });

    return { items };
  }

  findOne(id: number): Promise<ContactFace | null> {
    return this.contactFaceRepository.findOne({
      where: { id },
      relations: {
        company: true,
        position: true,
      },
    });
  }

  remove(id: number): Promise<DeleteResultDto> {
    return this.contactFaceRepository.delete(id);
  }

  async update(
    id: number,
    updateContactFaceDto: UpdateContactFaceDto,
  ): Promise<ContactFace> {
    await this.contactFaceRepository.update(id, updateContactFaceDto);

    return this.findOne(id);
  }
}
