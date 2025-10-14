import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, BeforeInsert } from 'typeorm';
import { ScheduleEntity } from './schedule.entity';
import { generateId } from 'src/utils/utils';

@Entity('films')
export class FilmEntity {
  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  @PrimaryColumn()
  id: string;

  @Column({ type: 'double precision' })
  rating: number;

  @Column()
  director: string;

  @Column('text', { array: true })
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film, {
    cascade: true,
  })
  schedule: ScheduleEntity[];

  
  @BeforeInsert()
  generateId() {
    if (!this.id) this.id = generateId();
  }
}
