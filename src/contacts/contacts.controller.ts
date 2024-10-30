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
  ApiFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import { ApiFieldsQuery } from '../shared/decorators/api-fields-query.decorator';
import { ApiIdParam } from '../shared/decorators/api-id-param.decorator';
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
  @ApiFoundResponse({ description: 'Contacts found.' })
  findAll(@Query() query?: object): Promise<Contact[]> {
    return this.contactsService.findAll(query);
  }

  @Get(':id')
  @ApiIdParam()
  @ApiFoundResponse({ description: 'Contact found.' })
  findOne(@Param('id') id: string): Promise<Contact> {
    return this.contactsService.findOne(+id);
  }

  @Patch(':id')
  @ApiIdParam()
  @ApiOkResponse({ description: 'Contact updated.' })
  update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<UpdateResult> {
    return this.contactsService.update(+id, updateContactDto);
  }

  @Delete(':id')
  @ApiIdParam()
  @ApiOkResponse({ description: 'Contact deleted.' })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.contactsService.remove(+id);
  }
}
