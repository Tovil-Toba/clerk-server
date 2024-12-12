import { FindAllResultDto } from '../../shared/dto/find-all-result.dto';
import { ContactFacePosition } from '../entities/contact-face-position.entity';

export class FindAllContactFacePositionsDto implements FindAllResultDto {
  count: number;
  items: ContactFacePosition[];
}
