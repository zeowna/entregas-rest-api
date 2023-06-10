import { Test, TestingModule } from '@nestjs/testing';
import { ProductsTypeORMRepository } from './products-typeorm.repository';

describe('ProductsTypeORMRepository', () => {
  let service: ProductsTypeORMRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsTypeORMRepository],
    }).compile();

    service = module.get<ProductsTypeORMRepository>(ProductsTypeORMRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
