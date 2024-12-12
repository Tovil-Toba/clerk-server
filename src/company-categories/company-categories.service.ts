import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { DeleteResultDto } from '../shared/dto/delete-result.dto';
import { FindNamesResultDto } from '../shared/dto/find-names-result.dto';
import { QueryFieldsService } from '../shared/services/query-fields.service';
import { COMPANY_CATEGORIES_QUERY_FIELDS } from './constants/company-categories-query-fields';
import { CreateCompanyCategoryDto } from './dto/create-company-category.dto';
import { FindAllCompanyCategoriesDto } from './dto/find-all-company-categories.dto';
import { UpdateCompanyCategoryDto } from './dto/update-company-category.dto';
import { CompanyCategory } from './entities/company-category.entity';

@Injectable()
export class CompanyCategoriesService {
  constructor(
    @InjectRepository(CompanyCategory)
    private readonly companyCategoryRepository: Repository<CompanyCategory>,
    private readonly queryFieldsService: QueryFieldsService<CompanyCategory>,
  ) {}

  create(
    createCompanyCategoryDto: CreateCompanyCategoryDto,
  ): Promise<CompanyCategory> {
    return this.companyCategoryRepository.save(createCompanyCategoryDto);
  }

  async findAll(query: object): Promise<FindAllCompanyCategoriesDto> {
    const options: FindManyOptions<CompanyCategory> =
      this.queryFieldsService.getFindManyOptions(
        query,
        COMPANY_CATEGORIES_QUERY_FIELDS,
      );

    const count = await this.companyCategoryRepository.count(options);
    const items = await this.companyCategoryRepository.find(options);

    return {
      count,
      items,
    };
  }

  async findNames(): Promise<FindNamesResultDto> {
    const items = await this.companyCategoryRepository.find({
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

  findOne(id: number): Promise<CompanyCategory | null> {
    return this.companyCategoryRepository.findOne({
      where: { id },
    });
  }

  remove(id: number): Promise<DeleteResultDto> {
    return this.companyCategoryRepository.delete(id);
  }

  async update(
    id: number,
    updateCompanyCategoryDto: UpdateCompanyCategoryDto,
  ): Promise<CompanyCategory> {
    await this.companyCategoryRepository.update(id, updateCompanyCategoryDto);

    return this.findOne(id);
  }
}
