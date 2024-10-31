import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { DeleteResultDto } from '../shared/dto/delete-result.dto';
import { UpdateResultDto } from '../shared/dto/update-result.dto';
import { QueryFieldsService } from '../shared/services/query-fields.service';
import { CONTACT_FACES_QUERY_FIELDS } from './constants/contact-faces-query-fields';
import { CreateContactFaceDto } from './dto/create-contact-face.dto';
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

  findAll(query: object): Promise<ContactFace[]> {
    const options: FindManyOptions<ContactFace> =
      this.queryFieldsService.getFindManyOptions(
        query,
        CONTACT_FACES_QUERY_FIELDS,
      );

    return this.contactFaceRepository.find({
      relations: {
        position: true,
      },
      ...options,
    });
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

  update(
    id: number,
    updateContactFaceDto: UpdateContactFaceDto,
  ): Promise<UpdateResultDto> {
    return this.contactFaceRepository.update(id, updateContactFaceDto);
  }

  remove(id: number): Promise<DeleteResultDto> {
    return this.contactFaceRepository.delete(id);
  }
}
