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
import { CONTACT_FACE_POSITIONS_QUERY_FIELDS } from './constants/contact-face-positions-query-fields';
import { ContactFacePositionsService } from './contact-face-positions.service';
import { CreateContactFacePositionDto } from './dto/create-contact-face-position.dto';
import { UpdateContactFacePositionDto } from './dto/update-contact-face-position.dto';
import { ContactFacePosition } from './entities/contact-face-position.entity';

@Controller('contact-face-positions')
@ApiTags('Должности контактных лиц')
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
  @ApiOkResponse({ description: 'Contact face positions found.' })
  findAll(@Query() query?: object): Promise<ContactFacePosition[]> {
    return this.contactFacePositionsService.findAll(query);
  }

  @Get(':id')
  @ApiIdParam()
  @ApiOkResponse({ description: 'Contact face position found.' })
  findOne(@Param('id') id: string): Promise<ContactFacePosition | null> {
    return this.contactFacePositionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiIdParam()
  @ApiOkResponse({ description: 'Contact face position updated.' })
  update(
    @Param('id') id: string,
    @Body() updateContactFacePositionDto: UpdateContactFacePositionDto,
  ): Promise<UpdateResult> {
    return this.contactFacePositionsService.update(
      +id,
      updateContactFacePositionDto,
    );
  }

  @Delete(':id')
  @ApiIdParam()
  @ApiOkResponse({ description: 'Contact face position deleted.' })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.contactFacePositionsService.remove(+id);
  }
}
