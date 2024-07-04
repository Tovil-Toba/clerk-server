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

import { ContactFace } from '../contact-faces/entities/contact-face.entity';
import { ApiFieldsQuery } from '../shared/decorators/api-fields-query.decorator';
import { ApiIdParam } from '../shared/decorators/api-id-param.decorator';
import { MANAGERS_QUERY_FIELDS } from './constants/managers-query-fields';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';
import { ManagersService } from './managers.service';

@Controller('managers')
@ApiTags('Менеджеры')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Manager created.',
    type: ContactFace,
  })
  create(@Body() createManagerDto: CreateManagerDto): Promise<Manager> {
    return this.managersService.create(createManagerDto);
  }

  @Get()
  @ApiFieldsQuery(MANAGERS_QUERY_FIELDS)
  @ApiOkResponse({ description: 'Managers found.' })
  findAll(@Query() query?: object): Promise<Manager[]> {
    return this.managersService.findAll(query);
  }

  @Get(':id')
  @ApiIdParam()
  @ApiOkResponse({ description: 'Manager found.' })
  findOne(@Param('id') id: string): Promise<Manager> {
    return this.managersService.findOne(+id);
  }

  @Patch(':id')
  @ApiIdParam()
  @ApiOkResponse({ description: 'Manager updated.' })
  update(
    @Param('id') id: string,
    @Body() updateManagerDto: UpdateManagerDto,
  ): Promise<UpdateResult> {
    return this.managersService.update(+id, updateManagerDto);
  }

  @Delete(':id')
  @ApiIdParam()
  @ApiOkResponse({ description: 'Manager deleted.' })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.managersService.remove(+id);
  }
}
