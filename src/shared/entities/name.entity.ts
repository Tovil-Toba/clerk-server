import { Column } from 'typeorm';

export class Name {
  /**
   * Имя
   */
  @Column()
  first: string;

  /**
   * Фамилия
   */
  @Column()
  last: string;

  /**
   * Отчество
   */
  @Column()
  middle?: string;
}
