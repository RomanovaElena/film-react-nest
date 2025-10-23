import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { GetFilmDto, GetScheduleDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilms: GetFilmDto[] = [
    {
      id: '0354a762-8928-427f-81d7-1656f717f39c',
      rating: 9.5,
      director: 'Оливер Беннет',
      tags: ['Рекомендуемые'],
      image: '/bg4s.jpg',
      cover: '/bg4c.jpg',
      title: 'Парадокс Нексуса',
      about:
        'Фильм об эксперименте по соединению человеческих умов. Исследует вопросы неприкосновенности частной жизни, идентичности и самой природы человеческого сознания',
      description: 'В фильме исследуются последствия новаторского эксперимента по соединению человеческих умов. По мере развития проекта участники сталкиваются с вопросами неприкосновенности частной жизни, идентичности и самой природы человеческого сознания.',
      schedule: [],
    },
  ];

  const mockSchedule: GetScheduleDto[] = [
    {
      id: '2d794723-eadc-43ea-b82b-268f0178fb43',
      daytime: new Date(),
      hall: 1,
      rows: 5,
      seats: 10,
      price: 350,
      taken: [],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            getAllFilms: jest
              .fn()
              .mockResolvedValue({ total: mockFilms.length, items: mockFilms }),
            getFilmSchedule: jest
              .fn()
              .mockResolvedValue({
                total: mockSchedule.length,
                items: mockSchedule,
              }),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all films', async () => {
    const result = await controller.getAll();
    expect(result.total).toBe(mockFilms.length);
    expect(result.items).toEqual(mockFilms);
    expect(service.getAllFilms).toHaveBeenCalled();
  });

  it('should return schedule for a film', async () => {
    const result = await controller.getSchedule('1');
    expect(result.items).toEqual(mockSchedule);
    expect(service.getFilmSchedule).toHaveBeenCalledWith('1');
  });
});
