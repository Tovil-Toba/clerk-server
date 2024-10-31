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
import { UpdateResultDto } from '../shared/dto/update-result.dto';
import { CONTACT_FACE_POSITIONS_QUERY_FIELDS } from './constants/contact-face-positions-query-fields';
import { ContactFacePositionsService } from './contact-face-positions.service';
import { CreateContactFacePositionDto } from './dto/create-contact-face-position.dto';
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
    type: Array<ContactFacePosition>,
  })
  findAll(@Query() query?: object): Promise<ContactFacePosition[]> {
    return this.contactFacePositionsService.findAll(query);
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

  @Patch(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Contact face position updated.',
    type: UpdateResultDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateContactFacePositionDto: UpdateContactFacePositionDto,
  ): Promise<UpdateResultDto> {
    return this.contactFacePositionsService.update(
      +id,
      updateContactFacePositionDto,
    );
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
}
