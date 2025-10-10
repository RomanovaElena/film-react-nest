import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, IFilm, Schedule } from '../films/schemas/films.schema';
import { GetFilmDto, GetScheduleDto } from '../films/dto/films.dto';

@Injectable()
export class FilmRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<IFilm>,
  ) {}

  // Создать или обновить фильм
  async save(dto: GetFilmDto): Promise<IFilm> {
    const existing = await this.filmModel.findOne({ id: dto.id });
    const entity = this.filmDtoToEntity(dto);
    if (existing) {
      existing.set(entity);
      return existing.save();
    }
    return new this.filmModel(entity).save();
  }

  // Получить все фильмы
  async findAll(): Promise<IFilm[]> {
    return this.filmModel.find().exec();
  }

  // Получить фильм по id
  async findById(id: string): Promise<IFilm | null> {
    return this.filmModel.findOne({ id }).exec();
  }

  // Удалить фильм
  async deleteById(id: string): Promise<void> {
    await this.filmModel.deleteOne({ id }).exec();
  }

    // Конвертеры из DTO в сущности Mongoose
  private filmDtoToEntity(dto: GetFilmDto): Partial<Film> {
    return {
      id: dto.id,
      rating: dto.rating,
      director: dto.director,
      tags: dto.tags,
      image: dto.image,
      cover: dto.cover,
      title: dto.title,
      about: dto.about,
      description: dto.description,
      schedule: dto.schedule.map((s) => this.scheduleDtoToEntity(s)),
    };
  }

  private scheduleDtoToEntity(dto: GetScheduleDto): Schedule {
    return {
      id: dto.id,
      daytime: dto.daytime,
      hall: dto.hall,
      rows: dto.rows,
      seats: dto.seats,
      price: dto.price,
      taken: dto.taken,
    } as Schedule;
  }
}
