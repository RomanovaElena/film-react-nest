import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmRepository } from '../repository/film.repository';
import { GetFilmDto, GetScheduleDto } from './dto/films.dto';
import { Schedule } from './schemas/films.schema';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepo: FilmRepository) {}

  async getAllFilms(): Promise<{ total: number; items: GetFilmDto[] }> {
    const films = await this.filmRepo.findAll();
    return {
      total: films.length,
      items: films.map((f) => this.entityToDto(f)),
    };
  }

  async getFilmSchedule(
    filmId: string,
  ): Promise<{ total: number; items: GetScheduleDto[] }> {
    const film = await this.filmRepo.findById(filmId);
    if (!film) {
      throw new NotFoundException(`Film with id ${filmId} not found`);
    }

    const schedule = film.schedule.map((s) => this.scheduleEntityToDto(s));

    return {
      total: schedule.length,
      items: schedule,
    };
  }

  private entityToDto(film: any): GetFilmDto {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedule.map((s: Schedule) => this.scheduleEntityToDto(s)),
    };
  }

  private scheduleEntityToDto(schedule: Schedule): GetScheduleDto {
    return {
      id: schedule.id,
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken,
    };
  }
}
