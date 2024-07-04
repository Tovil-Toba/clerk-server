import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import { QueryFieldsService } from '../shared/services/query-fields.service';
import { MANAGERS_QUERY_FIELDS } from './constants/managers-query-fields';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
    private readonly queryFieldsService: QueryFieldsService<Manager>,
  ) {}

  create(createManagerDto: CreateManagerDto): Promise<Manager> {
    return this.managerRepository.save(createManagerDto);
  }

  findAll(query: object): Promise<Manager[]> {
    const options: FindManyOptions<Manager> =
      this.queryFieldsService.getFindManyOptions(query, MANAGERS_QUERY_FIELDS);

    return this.managerRepository.find({
      ...options,
    });
  }

  findOne(id: number): Promise<Manager | null> {
    return this.managerRepository.findOne({
      where: { id },
    });
  }

  update(
    id: number,
    updateManagerDto: UpdateManagerDto,
  ): Promise<UpdateResult> {
    return this.managerRepository.update(id, updateManagerDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.managerRepository.delete(id);
  }
}
