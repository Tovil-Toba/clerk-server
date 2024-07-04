import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import { QueryFieldsService } from '../shared/services/query-fields.service';
import { CONTACT_FACE_POSITIONS_QUERY_FIELDS } from './constants/contact-face-positions-query-fields';
import { CreateContactFacePositionDto } from './dto/create-contact-face-position.dto';
import { UpdateContactFacePositionDto } from './dto/update-contact-face-position.dto';
import { ContactFacePosition } from './entities/contact-face-position.entity';

@Injectable()
export class ContactFacePositionsService {
  constructor(
    @InjectRepository(ContactFacePosition)
    private readonly contactPositionRepository: Repository<ContactFacePosition>,
    private readonly queryFieldsService: QueryFieldsService<ContactFacePosition>,
  ) {}

  create(
    createContactPositionDto: CreateContactFacePositionDto,
  ): Promise<ContactFacePosition> {
    return this.contactPositionRepository.save(createContactPositionDto);
  }

  findAll(query: object): Promise<ContactFacePosition[]> {
    const options: FindManyOptions<ContactFacePosition> =
      this.queryFieldsService.getFindManyOptions(
        query,
        CONTACT_FACE_POSITIONS_QUERY_FIELDS,
      );

    return this.contactPositionRepository.find({
      ...options,
    });
  }

  findOne(id: number): Promise<ContactFacePosition | null> {
    return this.contactPositionRepository.findOne({
      where: { id },
    });
  }

  update(
    id: number,
    updateContactPositionDto: UpdateContactFacePositionDto,
  ): Promise<UpdateResult> {
    return this.contactPositionRepository.update(id, updateContactPositionDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.contactPositionRepository.delete(id);
  }
}
