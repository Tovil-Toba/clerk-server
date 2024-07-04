import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { Company } from '../../companies/entities/company.entity';
import { DefaultColumns } from '../../shared/entities/default-columns.entity';

@Entity()
export class CompanyCategory extends DefaultColumns {
  /**
   * Название категории
   */
  @Column()
  name: string;

  @ApiHideProperty()
  @OneToMany(() => Company, (company: Company) => company.category)
  companies?: Company[];
}
