import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import { ApiFieldsQuery } from '../shared/decorators/api-fields-query.decorator';
import { ApiIdParam } from '../shared/decorators/api-id-param.decorator';
import { CompaniesService } from './companies.service';
import { COMPANIES_QUERY_FIELDS } from './constants/companies-query-fields';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Controller('companies')
@ApiTags('Компании')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Company created.',
    type: Company,
  })
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @ApiFieldsQuery(COMPANIES_QUERY_FIELDS)
  @ApiOkResponse({ description: 'Companies found.' })
  findAll(@Query() query?: object): Promise<Company[]> {
    return this.companiesService.findAll(query);
  }

  @Get(':id')
  @ApiIdParam()
  @ApiOkResponse({ description: 'Company found.' })
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companiesService.findOne(+id);
  }

  @Patch(':id')
  @ApiIdParam()
  @ApiOkResponse({ description: 'Company updated.' })
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<UpdateResult> {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiIdParam()
  @ApiOkResponse({ description: 'Company deleted.' })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.companiesService.remove(+id);
  }
}