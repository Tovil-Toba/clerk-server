import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueryFieldsService } from '../shared/services/query-fields.service';
import { Manager } from './entities/manager.entity';
import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';

@Module({
  controllers: [ManagersController],
  imports: [TypeOrmModule.forFeature([Manager])],
  providers: [ManagersService, QueryFieldsService],
})
export class ManagersModule {}
