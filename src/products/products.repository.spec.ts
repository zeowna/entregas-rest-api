import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepositoryService } from './products.repository';

describe('ProductsRepositoryService', () => {
  let service: ProductsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsRepositoryService],
    }).compile();

    service = module.get<ProductsRepositoryService>(ProductsRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
