import { FindAllResultDto } from '../../shared/dto/find-all-result.dto';
import { Contact } from '../entities/contact.entity';

export class FindAllContactsDto implements FindAllResultDto {
  count: number;
  items: Contact[];
}
