import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FilmEntity } from './film.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: string = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

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
}