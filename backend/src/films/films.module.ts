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


// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { FilmsController } from './films.controller';
// import { FilmsService } from './films.service';
// import { FilmRepository } from '../repository/film.repository';
// import { Film, FilmSchema } from '../films/schemas/films.schema';

// @Module({
//   imports: [MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }])],
//   controllers: [FilmsController],
//   providers: [FilmsService, FilmRepository],
//   exports: [FilmsService, FilmRepository],
// })
// export class FilmsModule {}
