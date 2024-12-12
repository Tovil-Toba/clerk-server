import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { DeleteResultDto } from '../shared/dto/delete-result.dto';
import { FindNamesResultDto } from '../shared/dto/find-names-result.dto';
import { QueryFieldsService } from '../shared/services/query-fields.service';
import { COMPANIES_QUERY_FIELDS } from './constants/companies-query-fields';
import { CreateCompanyDto } from './dto/create-company.dto';
import { FindAllCompaniesDto } from './dto/find-all-companies.dto';
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

  async findAll(query: object): Promise<FindAllCompaniesDto> {
    const options: FindManyOptions<Company> = {
      relations: {
        category: true,
        manager: true,
      },
      ...this.queryFieldsService.getFindManyOptions(
        query,
        COMPANIES_QUERY_FIELDS,
      ),
    };

    const count = await this.companyRepository.count(options);
    const items = await this.companyRepository.find(options);

    return {
      count,
      items,
    };
  }

  async findNames(): Promise<FindNamesResultDto> {
    const items = await this.companyRepository.find({
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

  findOne(id: number): Promise<Company | null> {
    return this.companyRepository.findOne({
      where: { id },
      relations: {
        category: true,
        manager: true,
      },
    });
  }

  remove(id: number): Promise<DeleteResultDto> {
    return this.companyRepository.delete(id);
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    await this.companyRepository.update(id, updateCompanyDto);

    return this.findOne(id);
  }
}
