import { Test, TestingModule } from '@nestjs/testing';
import { PartnerProductsService } from './partner-products.service';

describe('PartnerProductsService', () => {
  let service: PartnerProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnerProductsService],
    }).compile();

    service = module.get<PartnerProductsService>(PartnerProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
