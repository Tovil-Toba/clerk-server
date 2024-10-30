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
import { CONTACT_OFFERS_QUERY_FIELDS } from './constants/contact-offers-query-fields';
import { ContactOffersService } from './contact-offers.service';
import { CreateContactOfferDto } from './dto/create-contact-offer.dto';
import { UpdateContactOfferDto } from './dto/update-contact-offer.dto';
import { ContactOffer } from './entities/contact-offer.entity';

@Controller('contact-offers')
@ApiTags('contact-offers')
export class ContactOffersController {
  constructor(private readonly contactOffersService: ContactOffersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Contact offer created.',
    type: ContactOffer,
  })
  create(
    @Body() createContactOfferDto: CreateContactOfferDto,
  ): Promise<ContactOffer> {
    return this.contactOffersService.create(createContactOfferDto);
  }

  @Get()
  @ApiFieldsQuery(CONTACT_OFFERS_QUERY_FIELDS)
  @ApiFoundResponse({ description: 'Contact offers found.' })
  findAll(@Query() query?: object): Promise<ContactOffer[]> {
    return this.contactOffersService.findAll(query);
  }

  @Get(':id')
  @ApiIdParam()
  @ApiFoundResponse({ description: 'Contact offer found.' })
  findOne(@Param('id') id: string): Promise<ContactOffer | null> {
    return this.contactOffersService.findOne(+id);
  }

  @Patch(':id')
  @ApiIdParam()
  @ApiOkResponse({ description: 'Contact offer updated.' })
  update(
    @Param('id') id: string,
    @Body() updateContactOfferDto: UpdateContactOfferDto,
  ): Promise<UpdateResult> {
    return this.contactOffersService.update(+id, updateContactOfferDto);
  }

  @Delete(':id')
  @ApiIdParam()
  @ApiOkResponse({ description: 'Contact offer deleted.' })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.contactOffersService.remove(+id);
  }
}
