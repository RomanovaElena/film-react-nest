import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from './entities/film.entity';
import { ScheduleEntity } from './entities/schedule.entity';
import { FilmRepository } from '../repository/film.repository';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity, ScheduleEntity])],
  providers: [FilmRepository, FilmsService],
  controllers: [FilmsController],
  exports: [FilmRepository],
})
export class FilmsModule {}