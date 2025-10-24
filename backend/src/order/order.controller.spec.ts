import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrderResponse: OrderResponseDto = {
    total: 1,
    items: [
      {
        id: '1',
        film: '1',
        session: '1',
        daytime: new Date().toISOString(),
        row: 1,
        seat: 1,
        price: 300,
      },
    ],
  };

  const mockOrder: CreateOrderDto = {
    email: 'test@test.com',
    phone: '+79999999999',
    tickets: [
      {
        film: '1',
        session: '1',
        daytime: new Date().toISOString(),
        row: 1,
        seat: 1,
        price: 300,
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn().mockResolvedValue(mockOrderResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', async () => {
    const result = await controller.createOrder(mockOrder);
    expect(result).toEqual(mockOrderResponse);
    expect(service.createOrder).toHaveBeenCalledWith(mockOrder);
  });
});