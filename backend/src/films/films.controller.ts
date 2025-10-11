import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetFilmDto, GetScheduleDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAll(): Promise<{ total: number; items: GetFilmDto[] }> {
    const films = await this.filmsService.getAllFilms();
    return films;
  }

  @Get(':id/schedule')
  async getSchedule(
    @Param('id') id: string,
  ): Promise<{ items: GetScheduleDto[] }> {
    const schedule = await this.filmsService.getFilmSchedule(id);
    return schedule;
  }
  // @Get(':id/schedule')
  // async getSchedule(@Param('id') id: string): Promise<GetScheduleDto[]> {
  //   return this.filmsService.getFilmSchedule(id);
  // }
}
