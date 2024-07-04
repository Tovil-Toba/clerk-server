import { ApiHideProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class DefaultColumns {
  /**
   * Идентификатор
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Активная
   */
  @Column({ default: true })
  isActive?: boolean;

  /**
   * Дата создания
   */
  @ApiHideProperty()
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Дата изменения
   */
  @ApiHideProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
