import { Injectable } from '@nestjs/common';
import { ProductStatuses } from '../products/entities/product-statuses.enum';
import { ProductCategoriesService } from '../products/product-categories/product-categories.service';
import { ProductCategorySizesService } from '../products/product-category-sizes/product-category-sizes.service';
import { ProductsService } from '../products/products.service';
import { PartnersService } from '../partners/partners.service';
import { PartnerProductsService } from '../partners/partner-products/partner-products.service';
import { PartnerProductStatusesEnum } from '../partners/partner-products/entities/partner-product-statuses.enum';

@Injectable()
export class DbService {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
    private readonly productCategorySizesService: ProductCategorySizesService,
    private readonly productsService: ProductsService,
    private readonly partnersService: PartnersService,
    private readonly partnerProductsService: PartnerProductsService,
  ) {}

  async seed() {
    const category = await this.productCategoriesService.create({
      name: 'Gás',
    });

    const sizes = await Promise.all([
      this.productCategorySizesService.create({ category, name: 'P13' }),
      this.productCategorySizesService.create({ category, name: 'P20' }),
      this.productCategorySizesService.create({ category, name: 'P45' }),
      this.productCategorySizesService.create({ category, name: 'P90' }),
    ]);

    const products = await Promise.all(
      sizes.map(async (size) =>
        this.productsService.create({
          name: 'Botijão',
          category,
          size: size.name,
          status: ProductStatuses.Active,
        }),
      ),
    );

    const partner = await this.partnersService.create({
      name: 'Saldanha Distribuidora',
      cnpj: '12312312',
      pictureURI:
        'https://clubedoassinante.clicrbs.com.br/imagens/beneficio/large_beneficio20171010091920.png',
      address: {
        cep: '806200070',
        city: 'Curitiba',
        complement: 'Loja 1',
        neighbourhood: 'Água Verde',
        number: 293,
        state: 'PR',
        street: 'Rua Mato Grosso',
      },
    });

    const partnerProduct = await this.partnerProductsService.create({
      product: products.find(({ size }) => size === 'P13'),
      partner,
      status: PartnerProductStatusesEnum.Active,
      value: 15000,
    });
  }
}
