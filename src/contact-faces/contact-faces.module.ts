import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueryFieldsService } from '../shared/services/query-fields.service';
import { ContactFacesController } from './contact-faces.controller';
import { ContactFacesService } from './contact-faces.service';
import { ContactFace } from './entities/contact-face.entity';

@Module({
  controllers: [ContactFacesController],
  imports: [TypeOrmModule.forFeature([ContactFace])],
  providers: [ContactFacesService, QueryFieldsService],
})
export class ContactFacesModule {}
