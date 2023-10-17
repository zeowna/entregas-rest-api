import { Test, TestingModule } from '@nestjs/testing';
import { ProductsTypeORMRepository } from './products-typeorm.repository';
import { dataSourceTestOptions } from '../../../db/data-source';
import { Product } from '../entities/product.entity';
import { MockedTypeORMModuleFactory } from '../../common';
import { ProductStatus } from '../entities/product-status.enum';
import { ProductCategoriesTypeORMRepository } from './product-categories-typeorm.repository';
import { ProductCategory } from '../entities/product-category.entity';

describe('ProductsTypeORMRepository', () => {
  const MockedTypeORMModule = MockedTypeORMModuleFactory.usePgMem();

  let repository: ProductsTypeORMRepository;
  let productCategoriesRepository: ProductCategoriesTypeORMRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MockedTypeORMModule.forRoot(dataSourceTestOptions),
        MockedTypeORMModule.forFeature([Product, ProductCategory]),
      ],
      providers: [
        ProductsTypeORMRepository,
        ProductCategoriesTypeORMRepository,
      ],
    }).compile();

    repository = module.get<ProductsTypeORMRepository>(
      ProductsTypeORMRepository,
    );
    productCategoriesRepository =
      module.get<ProductCategoriesTypeORMRepository>(
        ProductCategoriesTypeORMRepository,
      );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create', async () => {
    const category = await productCategoriesRepository.create(
      new ProductCategory({ name: 'Gás' }),
    );

    const response = await repository.create(
      new Product({
        name: 'Botijão',
        category: category,
        size: 'p13',
        status: ProductStatus.Active,
      }),
    );

    console.log({ response });
  });
});
