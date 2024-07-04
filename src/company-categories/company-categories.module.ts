import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueryFieldsService } from '../shared/services/query-fields.service';
import { CompanyCategoriesController } from './company-categories.controller';
import { CompanyCategoriesService } from './company-categories.service';
import { CompanyCategory } from './entities/company-category.entity';

@Module({
  controllers: [CompanyCategoriesController],
  imports: [TypeOrmModule.forFeature([CompanyCategory])],
  providers: [CompanyCategoriesService, QueryFieldsService],
})
export class CompanyCategoriesModule {}
