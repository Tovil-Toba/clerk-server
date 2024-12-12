import { FindAllResultDto } from '../../shared/dto/find-all-result.dto';
import { ContactOffer } from '../entities/contact-offer.entity';

export class FindAllContactOffersDto implements FindAllResultDto {
  count: number;
  items: ContactOffer[];
}
