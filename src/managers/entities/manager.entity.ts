import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { Company } from '../../companies/entities/company.entity';
import { DefaultColumns } from '../../shared/entities/default-columns.entity';
import { Name } from '../../shared/entities/name.entity';

@Entity()
export class Manager extends DefaultColumns {
  /**
   * Адрес электронной почты
   */
  @Column()
  email?: string;

  /**
   * ФИО
   */
  @Column(() => Name)
  name: Name;

  /**
   * Телефон
   */
  @Column()
  phone?: string;

  @ApiHideProperty()
  @OneToMany(() => Company, (company: Company) => company.manager)
  companies?: Company[];
}
