import { FindAllResultDto } from '../../shared/dto/find-all-result.dto';
import { Manager } from '../entities/manager.entity';

export class FindAllManagersDto implements FindAllResultDto {
  count: number;
  items: Manager[];
}
