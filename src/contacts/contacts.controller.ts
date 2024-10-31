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
import { CONTACTS_QUERY_FIELDS } from './constants/contacts-query-fields';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Controller('contacts')
@ApiTags('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Contact created.',
    type: Contact,
  })
  create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  @ApiFieldsQuery(CONTACTS_QUERY_FIELDS)
  @ApiOkResponse({
    description: 'Contacts found.',
    type: Array<Contact>,
  })
  findAll(@Query() query?: object): Promise<Contact[]> {
    return this.contactsService.findAll(query);
  }

  @Get(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Contact found.',
    type: Contact,
  })
  findOne(@Param('id') id: string): Promise<Contact> {
    return this.contactsService.findOne(+id);
  }

  @Patch(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Contact updated.',
    type: UpdateResultDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<UpdateResultDto> {
    return this.contactsService.update(+id, updateContactDto);
  }

  @Delete(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Contact deleted.',
    type: DeleteResultDto,
  })
  remove(@Param('id') id: string): Promise<DeleteResultDto> {
    return this.contactsService.remove(+id);
  }
}
