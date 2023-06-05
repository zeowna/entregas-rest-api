import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategorySizesController } from './product-category-sizes.controller';
import { ProductCategorySizesService } from './product-category-sizes.service';

describe('ProductCategorySizesController', () => {
  let controller: ProductCategorySizesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCategorySizesController],
      providers: [ProductCategorySizesService],
    }).compile();

    controller = module.get<ProductCategorySizesController>(
      ProductCategorySizesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
