import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueryFieldsService } from '../shared/services/query-fields.service';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';

@Module({
  controllers: [ContactsController],
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactsService, QueryFieldsService],
})
export class ContactsModule {}
