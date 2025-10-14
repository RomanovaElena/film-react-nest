import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, BeforeInsert } from 'typeorm';
import { FilmEntity } from './film.entity';
import { generateId } from 'src/utils/utils';

@Entity('schedules')
export class ScheduleEntity {
  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  @PrimaryColumn()
  id: string;

  @Column({ type: 'timestamp', nullable: false })
  daytime: Date;

  @Column({ type: 'int' })
  hall: number;

  @Column({ type: 'int' })
  rows: number;

  @Column({ type: 'int' })
  seats: number;

  @Column({ type: 'double precision' })
  price: number;

  @Column('text', { array: true })
  taken: string[];

  @ManyToOne(() => FilmEntity, (film) => film.schedule, { onDelete: 'CASCADE' })
  film: FilmEntity;

  
  @BeforeInsert()
  generateId() {
    if (!this.id) this.id = generateId();
  }
}
