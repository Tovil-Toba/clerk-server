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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ApiFieldsQuery } from '../shared/decorators/api-fields-query.decorator';
import { ApiIdParam } from '../shared/decorators/api-id-param.decorator';
import { DeleteResultDto } from '../shared/dto/delete-result.dto';
import { FindUserNamesResultDto } from '../shared/dto/find-user-names-result.dto';
import { CONTACT_FACES_QUERY_FIELDS } from './constants/contact-faces-query-fields';
import { ContactFacesService } from './contact-faces.service';
import { CreateContactFaceDto } from './dto/create-contact-face.dto';
import { FindAllContactFacesDto } from './dto/find-all-contact-faces.dto';
import { UpdateContactFaceDto } from './dto/update-contact-face.dto';
import { ContactFace } from './entities/contact-face.entity';

@Controller('contact-faces')
@ApiTags('contact-faces')
export class ContactFacesController {
  constructor(private readonly contactFacesService: ContactFacesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Contact face position created.',
    type: ContactFace,
  })
  create(
    @Body() createContactFaceDto: CreateContactFaceDto,
  ): Promise<ContactFace> {
    return this.contactFacesService.create(createContactFaceDto);
  }

  @Get()
  @ApiFieldsQuery(CONTACT_FACES_QUERY_FIELDS)
  @ApiOkResponse({
    description: 'Contact faces found.',
    type: FindAllContactFacesDto,
  })
  findAll(@Query() query?: object): Promise<FindAllContactFacesDto> {
    return this.contactFacesService.findAll(query);
  }

  @Get('/names')
  @ApiOkResponse({
    description: 'Contact face names found.',
    type: FindUserNamesResultDto,
  })
  @ApiQuery({
    name: 'companyId',
    description: 'Идентификатор компании',
    required: false,
  })
  findNames(
    @Query('companyId') companyId?: string,
  ): Promise<FindUserNamesResultDto> {
    return this.contactFacesService.findNames(companyId && +companyId);
  }

  @Get(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Contact face found.',
    type: ContactFace,
  })
  findOne(@Param('id') id: string): Promise<ContactFace> {
    return this.contactFacesService.findOne(+id);
  }

  @Delete(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Contact face deleted.',
    type: DeleteResultDto,
  })
  remove(@Param('id') id: string): Promise<DeleteResultDto> {
    return this.contactFacesService.remove(+id);
  }

  @Patch(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Contact face updated.',
    type: ContactFace,
  })
  update(
    @Param('id') id: string,
    @Body() updateContactFaceDto: UpdateContactFaceDto,
  ): Promise<ContactFace> {
    return this.contactFacesService.update(+id, updateContactFaceDto);
  }
}
