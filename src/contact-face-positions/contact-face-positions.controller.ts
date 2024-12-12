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
import { CONTACT_FACE_POSITIONS_QUERY_FIELDS } from './constants/contact-face-positions-query-fields';
import { ContactFacePositionsService } from './contact-face-positions.service';
import { CreateContactFacePositionDto } from './dto/create-contact-face-position.dto';
import { FindAllContactFacePositionsDto } from './dto/find-all-contact-face-positions.dto';
import { UpdateContactFacePositionDto } from './dto/update-contact-face-position.dto';
import { ContactFacePosition } from './entities/contact-face-position.entity';

@Controller('contact-face-positions')
@ApiTags('contact-face-positions')
export class ContactFacePositionsController {
  constructor(
    private readonly contactFacePositionsService: ContactFacePositionsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Contact face position created.',
    type: ContactFacePosition,
  })
  create(
    @Body() createContactFacePositionDto: CreateContactFacePositionDto,
  ): Promise<ContactFacePosition> {
    return this.contactFacePositionsService.create(
      createContactFacePositionDto,
    );
  }

  @Get()
  @ApiFieldsQuery(CONTACT_FACE_POSITIONS_QUERY_FIELDS)
  @ApiOkResponse({
    description: 'Contact face positions found.',
    type: FindAllContactFacePositionsDto,
  })
  findAll(@Query() query?: object): Promise<FindAllContactFacePositionsDto> {
    return this.contactFacePositionsService.findAll(query);
  }

  @Get('/names')
  @ApiOkResponse({
    description: 'Contact face position names found.',
    type: FindNamesResultDto,
  })
  findNames(): Promise<FindNamesResultDto> {
    return this.contactFacePositionsService.findNames();
  }

  @Get(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Contact face position found.',
    type: ContactFacePosition,
  })
  findOne(@Param('id') id: string): Promise<ContactFacePosition | null> {
    return this.contactFacePositionsService.findOne(+id);
  }

  @Delete(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Contact face position deleted.',
    type: DeleteResultDto,
  })
  remove(@Param('id') id: string): Promise<DeleteResultDto> {
    return this.contactFacePositionsService.remove(+id);
  }

  @Patch(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Contact face position updated.',
    type: ContactFacePosition,
  })
  update(
    @Param('id') id: string,
    @Body() updateContactFacePositionDto: UpdateContactFacePositionDto,
  ): Promise<ContactFacePosition> {
    return this.contactFacePositionsService.update(
      +id,
      updateContactFacePositionDto,
    );
  }
}
