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

import { ContactFace } from '../contact-faces/entities/contact-face.entity';
import { ApiFieldsQuery } from '../shared/decorators/api-fields-query.decorator';
import { ApiIdParam } from '../shared/decorators/api-id-param.decorator';
import { DeleteResultDto } from '../shared/dto/delete-result.dto';
import { UpdateResultDto } from '../shared/dto/update-result.dto';
import { MANAGERS_QUERY_FIELDS } from './constants/managers-query-fields';
import { CreateManagerDto } from './dto/create-manager.dto';
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
    type: ContactFace,
  })
  create(@Body() createManagerDto: CreateManagerDto): Promise<Manager> {
    return this.managersService.create(createManagerDto);
  }

  @Get()
  @ApiFieldsQuery(MANAGERS_QUERY_FIELDS)
  @ApiOkResponse({
    description: 'Managers found.',
    type: Array<Manager>,
  })
  findAll(@Query() query?: object): Promise<Manager[]> {
    return this.managersService.findAll(query);
  }

  @Get(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Manager found.',
    type: Manager,
  })
  findOne(@Param('id') id: string): Promise<Manager> {
    return this.managersService.findOne(+id);
  }

  @Patch(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Manager updated.',
    type: UpdateResultDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateManagerDto: UpdateManagerDto,
  ): Promise<UpdateResultDto> {
    return this.managersService.update(+id, updateManagerDto);
  }

  @Delete(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Manager deleted.',
    type: DeleteResultDto,
  })
  remove(@Param('id') id: string): Promise<DeleteResultDto> {
    return this.managersService.remove(+id);
  }
}
