import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueryFieldsService } from '../shared/services/query-fields.service';
import { ContactFacePositionsController } from './contact-face-positions.controller';
import { ContactFacePositionsService } from './contact-face-positions.service';
import { ContactFacePosition } from './entities/contact-face-position.entity';

@Module({
  controllers: [ContactFacePositionsController],
  imports: [TypeOrmModule.forFeature([ContactFacePosition])],
  providers: [ContactFacePositionsService, QueryFieldsService],
})
export class ContactFacePositionsModule {}
