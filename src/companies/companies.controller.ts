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

import { ApiFieldsQuery } from '../shared/decorators/api-fields-query.decorator';
import { ApiIdParam } from '../shared/decorators/api-id-param.decorator';
import { DeleteResultDto } from '../shared/dto/delete-result.dto';
import { FindNamesResultDto } from '../shared/dto/find-names-result.dto';
import { CompaniesService } from './companies.service';
import { COMPANIES_QUERY_FIELDS } from './constants/companies-query-fields';
import { CreateCompanyDto } from './dto/create-company.dto';
import { FindAllCompaniesDto } from './dto/find-all-companies.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Controller('companies')
@ApiTags('companies')
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
  @ApiOkResponse({
    description: 'Companies found.',
    type: FindAllCompaniesDto,
  })
  findAll(@Query() query?: object): Promise<FindAllCompaniesDto> {
    return this.companiesService.findAll(query);
  }

  @Get('/names')
  @ApiOkResponse({
    description: 'Company names found.',
    type: FindNamesResultDto,
  })
  findNames(): Promise<FindNamesResultDto> {
    return this.companiesService.findNames();
  }

  @Get(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Company found.',
    type: Company,
  })
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companiesService.findOne(+id);
  }

  @Delete(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Company deleted.',
    type: DeleteResultDto,
  })
  remove(@Param('id') id: string): Promise<DeleteResultDto> {
    return this.companiesService.remove(+id);
  }

  @Patch(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Company updated.',
    type: Company,
  })
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companiesService.update(+id, updateCompanyDto);
  }
}
