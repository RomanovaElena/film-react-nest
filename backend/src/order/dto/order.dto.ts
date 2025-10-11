export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: CreateTicketDto[];
}

export class CreateTicketDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class OrderResponseDto {
  total: number;
  items: OrderTicketDto[];
}

export class OrderTicketDto extends CreateTicketDto {
  id: string;
}
