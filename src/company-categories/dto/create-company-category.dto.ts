import { OmitType } from '@nestjs/swagger';

import { CompanyCategory } from '../entities/company-category.entity';

export class CreateCompanyCategoryDto extends OmitType(CompanyCategory, [
  'id',
] as const) {}
