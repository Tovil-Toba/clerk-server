import { FindAllResultDto } from '../../shared/dto/find-all-result.dto';
import { CompanyCategory } from '../entities/company-category.entity';

export class FindAllCompanyCategoriesDto implements FindAllResultDto {
  count: number;
  items: CompanyCategory[];
}
