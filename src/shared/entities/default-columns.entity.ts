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
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Дата изменения
   */
  @UpdateDateColumn()
  updatedAt: Date;
}
