import { OmitType } from '@nestjs/swagger';

import { Manager } from '../entities/manager.entity';

export class CreateManagerDto extends OmitType(Manager, [
  'createdAt',
  'id',
  'updatedAt',
  // 'companies',
] as const) {}
