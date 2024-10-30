import { PartialType } from '@nestjs/swagger';

import { CreateCompanyCategoryDto } from './create-company-category.dto';

export class UpdateCompanyCategoryDto extends PartialType(
  CreateCompanyCategoryDto,
) {}
