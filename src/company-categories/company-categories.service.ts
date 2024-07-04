import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import { QueryFieldsService } from '../shared/services/query-fields.service';
import { COMPANY_CATEGORIES_QUERY_FIELDS } from './constants/company-categories-query-fields';
import { CreateCompanyCategoryDto } from './dto/create-company-category.dto';
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

  findAll(query: object): Promise<CompanyCategory[]> {
    const options: FindManyOptions<CompanyCategory> =
      this.queryFieldsService.getFindManyOptions(
        query,
        COMPANY_CATEGORIES_QUERY_FIELDS,
      );

    return this.companyCategoryRepository.find(options);
  }

  findOne(id: number): Promise<CompanyCategory | null> {
    return this.companyCategoryRepository.findOne({
      where: { id },
    });
  }

  update(
    id: number,
    updateCompanyCategoryDto: UpdateCompanyCategoryDto,
  ): Promise<UpdateResult> {
    return this.companyCategoryRepository.update(id, updateCompanyCategoryDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.companyCategoryRepository.delete(id);
  }
}
