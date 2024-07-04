import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueryFieldsService } from '../shared/services/query-fields.service';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';

@Module({
  controllers: [CompaniesController],
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompaniesService, QueryFieldsService],
})
export class CompaniesModule {}
