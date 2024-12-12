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
import { CompanyCategoriesService } from './company-categories.service';
import { COMPANY_CATEGORIES_QUERY_FIELDS } from './constants/company-categories-query-fields';
import { CreateCompanyCategoryDto } from './dto/create-company-category.dto';
import { FindAllCompanyCategoriesDto } from './dto/find-all-company-categories.dto';
import { UpdateCompanyCategoryDto } from './dto/update-company-category.dto';
import { CompanyCategory } from './entities/company-category.entity';

@Controller('company-categories')
@ApiTags('company-categories')
export class CompanyCategoriesController {
  constructor(
    private readonly companyCategoriesService: CompanyCategoriesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Company category created.',
    type: CompanyCategory,
  })
  create(
    @Body() createCompanyCategoryDto: CreateCompanyCategoryDto,
  ): Promise<CompanyCategory> {
    return this.companyCategoriesService.create(createCompanyCategoryDto);
  }

  @Get()
  @ApiFieldsQuery(COMPANY_CATEGORIES_QUERY_FIELDS)
  @ApiOkResponse({
    description: 'Company categories found.',
    type: FindAllCompanyCategoriesDto,
  })
  findAll(@Query() query?: object): Promise<FindAllCompanyCategoriesDto> {
    return this.companyCategoriesService.findAll(query);
  }

  @Get('/names')
  @ApiOkResponse({
    description: 'Company category names found.',
    type: FindNamesResultDto,
  })
  findNames(): Promise<FindNamesResultDto> {
    return this.companyCategoriesService.findNames();
  }

  @Get(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Company category found.',
    type: CompanyCategory,
  })
  findOne(@Param('id') id: string): Promise<CompanyCategory> {
    return this.companyCategoriesService.findOne(+id);
  }

  @Delete(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Company category deleted.',
    type: DeleteResultDto,
  })
  remove(@Param('id') id: string): Promise<DeleteResultDto> {
    return this.companyCategoriesService.remove(+id);
  }

  @Patch(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Company category updated.',
    type: CompanyCategory,
  })
  update(
    @Param('id') id: string,
    @Body() updateCompanyCategoryDto: UpdateCompanyCategoryDto,
  ): Promise<CompanyCategory> {
    return this.companyCategoriesService.update(+id, updateCompanyCategoryDto);
  }
}
