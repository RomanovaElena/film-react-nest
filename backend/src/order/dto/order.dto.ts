//TODO реализовать DTO для /orders

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

// DTO для ответа с id билета
export class OrderResponseDto {
  total: number;
  items: OrderTicketDto[];
}

export class OrderTicketDto extends CreateTicketDto {
  id: string; 
}