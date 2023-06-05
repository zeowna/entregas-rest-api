import { Test, TestingModule } from '@nestjs/testing';
import { PartnerProductsController } from './partner-products.controller';
import { PartnerProductsService } from './partner-products.service';

describe('PartnerProductsController', () => {
  let controller: PartnerProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnerProductsController],
      providers: [PartnerProductsService],
    }).compile();

    controller = module.get<PartnerProductsController>(
      PartnerProductsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
