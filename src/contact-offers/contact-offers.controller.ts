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
  @ApiOkResponse({
    description: 'Contact offers found.',
    type: Array<ContactOffer>,
  })
  findAll(@Query() query?: object): Promise<ContactOffer[]> {
    return this.contactOffersService.findAll(query);
  }

  @Get(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Contact offer found.',
    type: ContactOffer,
  })
  findOne(@Param('id') id: string): Promise<ContactOffer | null> {
    return this.contactOffersService.findOne(+id);
  }

  @Patch(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Contact offer updated.',
    type: UpdateResultDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateContactOfferDto: UpdateContactOfferDto,
  ): Promise<UpdateResultDto> {
    return this.contactOffersService.update(+id, updateContactOfferDto);
  }

  @Delete(':id')
  @ApiIdParam()
  @ApiOkResponse({
    description: 'Contact offer deleted.',
    type: DeleteResultDto,
  })
  remove(@Param('id') id: string): Promise<DeleteResultDto> {
    return this.contactOffersService.remove(+id);
  }
}
