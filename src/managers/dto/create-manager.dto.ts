import { OmitType } from '@nestjs/swagger';

import { Manager } from '../entities/manager.entity';

export class CreateManagerDto extends OmitType(Manager, [
  'id',
  // 'companies',
] as const) {}
