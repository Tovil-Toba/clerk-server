import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { DeleteResultDto } from '../shared/dto/delete-result.dto';
import { UpdateResultDto } from '../shared/dto/update-result.dto';
import { QueryFieldsService } from '../shared/services/query-fields.service';
import { COMPANIES_QUERY_FIELDS } from './constants/companies-query-fields';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly queryFieldsService: QueryFieldsService<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companyRepository.save(createCompanyDto);
  }

  findAll(query: object): Promise<Company[]> {
    const options: FindManyOptions<Company> =
      this.queryFieldsService.getFindManyOptions(query, COMPANIES_QUERY_FIELDS);

    return this.companyRepository.find({
      relations: {
        category: true,
        manager: true,
      },
      ...options,
    });
  }

  findOne(id: number): Promise<Company | null> {
    return this.companyRepository.findOne({
      where: { id },
      relations: {
        manager: true,
      },
    });
  }

  update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<UpdateResultDto> {
    return this.companyRepository.update(id, updateCompanyDto);
  }

  remove(id: number): Promise<DeleteResultDto> {
    return this.companyRepository.delete(id);
  }
}
