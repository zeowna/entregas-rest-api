import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategorySizesService } from './product-category-sizes.service';

describe('ProductCategorySizesService', () => {
  let service: ProductCategorySizesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCategorySizesService],
    }).compile();

    service = module.get<ProductCategorySizesService>(
      ProductCategorySizesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
