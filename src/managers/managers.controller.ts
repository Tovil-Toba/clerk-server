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
import { FindUserNamesResultDto } from '../shared/dto/find-user-names-result.dto';
import { MANAGERS_QUERY_FIELDS } from './constants/managers-query-fields';
import { CreateManagerDto } from './dto/create-manager.dto';
import { FindAllManagersDto } from './dto/find-all-managers.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';
import { ManagersService } from './managers.service';

@Controller('managers')
@ApiTags('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Manager created.',
    type: Manager,
  })
  create(@Body() createManagerDto: CreateManagerDto): Promise<Manager> {
    return this.managersService.create(createManagerDto);
  }

  @Get()
  @ApiFieldsQuery(MANAGERS_QUERY_FIELDS)
  @ApiOkResponse({
    description: 'Managers found.',
    type: FindAllManagersDto,
  })
  findAll(@Query() query?: object): Promise<FindAllManagersDto> {
    return this.managersService.findAll(query);
  }

  @Get('/names')
  @ApiOkResponse({
    description: 'Manager names found.',
    type: FindUserNamesResultDto,
  })
  findNames(): Promise<FindUserNamesResultDto> {
    return this.managersService.findNames();
  }

  @Get(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Manager found.',
    type: Manager,
  })
  findOne(@Param('id') id: number): Promise<Manager> {
    return this.managersService.findOne(id);
  }

  @Delete(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Manager deleted.',
    type: DeleteResultDto,
  })
  remove(@Param('id') id: number): Promise<DeleteResultDto> {
    return this.managersService.remove(id);
  }

  @Patch(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Manager updated.',
    type: Manager,
  })
  update(
    @Param('id') id: number,
    @Body() updateManagerDto: UpdateManagerDto,
  ): Promise<Manager> {
    return this.managersService.update(id, updateManagerDto);
  }
}
