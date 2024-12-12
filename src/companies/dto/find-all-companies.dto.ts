import { FindAllResultDto } from '../../shared/dto/find-all-result.dto';
import { Company } from '../entities/company.entity';

export class FindAllCompaniesDto implements FindAllResultDto {
  count: number;
  items: Company[];
}
