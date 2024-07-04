import { OmitType } from '@nestjs/swagger';

import { Company } from '../entities/company.entity';

export class CreateCompanyDto extends OmitType(Company, [
  'category',
  'contactFaces',
  'id',
  'manager',
] as const) {}
