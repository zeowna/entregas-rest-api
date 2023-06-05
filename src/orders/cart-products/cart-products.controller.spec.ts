import { Test, TestingModule } from '@nestjs/testing';
import { CartProductsController } from './cart-products.controller';
import { CartProductsService } from './cart-products.service';

describe('CartProductsController', () => {
  let controller: CartProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartProductsController],
      providers: [CartProductsService],
    }).compile();

    controller = module.get<CartProductsController>(CartProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
