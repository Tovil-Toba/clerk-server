import { FindAllResultDto } from '../../shared/dto/find-all-result.dto';
import { ContactFace } from '../entities/contact-face.entity';

export class FindAllContactFacesDto implements FindAllResultDto {
  count: number;
  items: ContactFace[];
}
