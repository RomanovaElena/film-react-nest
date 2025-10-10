import { Injectable, BadRequestException } from '@nestjs/common';
import { FilmRepository } from '../repository/film.repository';
import { CreateOrderDto, OrderResponseDto, OrderTicketDto } from './dto/order.dto';
import { Schedule } from '../films/schemas/films.schema';

@Injectable()
export class OrderService {
  constructor(private readonly filmRepo: FilmRepository) {}

  async createOrder(orderData: CreateOrderDto): Promise<OrderResponseDto> {
    const items: OrderTicketDto[] = [];

    for (const ticket of orderData.tickets) {
      // Получить фильм
      const film = await this.filmRepo.findById(ticket.film);
      if (!film) {
        throw new BadRequestException(`Film with id ${ticket.film} not found`);
      }

      // Найти сеанс
      const session = film.schedule.find((s) => s.id === ticket.session);
      if (!session) {
        throw new BadRequestException(`Session with id ${ticket.session} not found`);
      }

      const place = `${ticket.row}:${ticket.seat}`;

      // Проверить, доступно ли место
      if (session.taken.includes(place)) {
        throw new BadRequestException(`Seat ${place} is already booked`);
      }

      // Добавить место к занятым
      session.taken.push(place);

      // Сохранить изменения в фильме
      await this.filmRepo.save({
        id: film.id,
        rating: film.rating,
        director: film.director,
        tags: film.tags,
        image: film.image,
        cover: film.cover,
        title: film.title,
        about: film.about,
        description: film.description,
        schedule: film.schedule.map((s: Schedule) => ({
          id: s.id,
          daytime: s.daytime,
          hall: s.hall,
          rows: s.rows,
          seats: s.seats,
          price: s.price,
          taken: s.taken,
        })),
      });

      // Сформировать DTO для ответа
      items.push({
        ...ticket,
        id: `${ticket.film}-${ticket.session}-${ticket.row}-${ticket.seat}`, 
      });
    }

    const total = items.reduce((sum, t) => sum + t.price, 0);

    return { items, total };
  }
}
