import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmEntity } from '../films/entities/film.entity';
import { ScheduleEntity } from '../films/entities/schedule.entity';
import { GetFilmDto, GetScheduleDto } from '../films/dto/films.dto';

@Injectable()
export class FilmRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepo: Repository<FilmEntity>,
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepo: Repository<ScheduleEntity>,
  ) {}

  // Создать или обновить фильм
  async save(dto: GetFilmDto): Promise<FilmEntity> {
    const existing = await this.filmRepo.findOne({
      where: { id: dto.id },
      relations: ['schedule'],
    });

    const entity = this.filmDtoToEntity(dto);

    if (existing) {
      await this.filmRepo.save({ ...existing, ...entity });
      return this.filmRepo.findOne({
        where: { id: dto.id },
        relations: ['schedule'],
      });
    }

    return this.filmRepo.save(entity);
  }

  // Получить все фильмы
  async findAll(): Promise<FilmEntity[]> {
    return this.filmRepo.find({ relations: ['schedule'] });
  }

  // Получить фильм по id
  async findById(id: string): Promise<FilmEntity | null> {
    return this.filmRepo.findOne({ where: { id }, relations: ['schedule'] });
  }

  // Удалить фильм
  async deleteById(id: string): Promise<void> {
    await this.filmRepo.delete({ id });
  }

  // Конвертеры из DTO в сущности Postgre
  private filmDtoToEntity(dto: GetFilmDto): FilmEntity {
    const film = new FilmEntity();
    film.id = dto.id;
    film.rating = dto.rating;
    film.director = dto.director;
    film.tags = dto.tags;
    film.image = dto.image;
    film.cover = dto.cover;
    film.title = dto.title;
    film.about = dto.about;
    film.description = dto.description;
    film.schedule = dto.schedule.map((s) => this.scheduleDtoToEntity(s, film));
    return film;
  }

  private scheduleDtoToEntity(
    dto: GetScheduleDto,
    film: FilmEntity,
  ): ScheduleEntity {
    const schedule = new ScheduleEntity();
    schedule.id = dto.id;
    schedule.daytime = new Date(dto.daytime);
    schedule.hall = dto.hall;
    schedule.rows = dto.rows;
    schedule.seats = dto.seats;
    schedule.price = dto.price;
    schedule.taken = dto.taken;
    schedule.film = film;
    return schedule;
  }
}