import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { DeleteResultDto } from '../shared/dto/delete-result.dto';
import { FindNamesResultDto } from '../shared/dto/find-names-result.dto';
import { QueryFieldsService } from '../shared/services/query-fields.service';
import { CONTACT_FACE_POSITIONS_QUERY_FIELDS } from './constants/contact-face-positions-query-fields';
import { CreateContactFacePositionDto } from './dto/create-contact-face-position.dto';
import { FindAllContactFacePositionsDto } from './dto/find-all-contact-face-positions.dto';
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

  async findAll(query: object): Promise<FindAllContactFacePositionsDto> {
    const options: FindManyOptions<ContactFacePosition> =
      this.queryFieldsService.getFindManyOptions(
        query,
        CONTACT_FACE_POSITIONS_QUERY_FIELDS,
      );

    const count = await this.contactPositionRepository.count(options);
    const items = await this.contactPositionRepository.find(options);

    return {
      count,
      items,
    };
  }

  async findNames(): Promise<FindNamesResultDto> {
    const items = await this.contactPositionRepository.find({
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

  findOne(id: number): Promise<ContactFacePosition | null> {
    return this.contactPositionRepository.findOne({
      where: { id },
    });
  }

  remove(id: number): Promise<DeleteResultDto> {
    return this.contactPositionRepository.delete(id);
  }

  async update(
    id: number,
    updateContactPositionDto: UpdateContactFacePositionDto,
  ): Promise<ContactFacePosition> {
    await this.contactPositionRepository.update(id, updateContactPositionDto);

    return this.findOne(id);
  }
}
