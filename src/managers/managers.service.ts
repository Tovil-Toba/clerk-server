import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { DeleteResultDto } from '../shared/dto/delete-result.dto';
import { FindUserNamesResultDto } from '../shared/dto/find-user-names-result.dto';
import { QueryFieldsService } from '../shared/services/query-fields.service';
import { MANAGERS_QUERY_FIELDS } from './constants/managers-query-fields';
import { CreateManagerDto } from './dto/create-manager.dto';
import { FindAllManagersDto } from './dto/find-all-managers.dto';
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

  async findAll(query: object): Promise<FindAllManagersDto> {
    const options: FindManyOptions<Manager> =
      this.queryFieldsService.getFindManyOptions(query, MANAGERS_QUERY_FIELDS);

    const count = await this.managerRepository.count(options);
    const items = await this.managerRepository.find(options);

    return {
      count,
      items,
    };
  }

  async findNames(): Promise<FindUserNamesResultDto> {
    const items = await this.managerRepository.find({
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

  findOne(id: number): Promise<Manager | null> {
    return this.managerRepository.findOne({
      where: { id },
    });
  }

  remove(id: number): Promise<DeleteResultDto> {
    return this.managerRepository.delete(id);
  }

  async update(
    id: number,
    updateManagerDto: UpdateManagerDto,
  ): Promise<Manager> {
    await this.managerRepository.update(id, updateManagerDto);

    return this.findOne(id);
  }
}
