import { Injectable } from '@nestjs/common';
import { ProductStatus } from '../products/entities/product-status.enum';
import { ProductCategoriesService } from '../products/product-categories/product-categories.service';
import { ProductCategorySizesService } from '../products/product-category-sizes/product-category-sizes.service';
import { ProductsService } from '../products/products.service';
import { PartnersService } from '../partners/partners.service';
import { PartnerProductsService } from '../partners/partner-products/partner-products.service';
import { PartnerProductStatus } from '../partners/partner-products/entities/partner-product-status.enum';

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
          status: ProductStatus.Active,
        }),
      ),
    );

    const partner = await this.partnersService.create({
      name: 'Saldanha Distribuidora',
      cnpj: '12312312',
      pictureURI:
        'https://scontent.fcwb2-3.fna.fbcdn.net/v/t39.30808-6/245969868_3154848254745379_1920533050163387630_n.jpg?_nc_cat=103&cb=99be929b-3346023f&ccb=1-7&_nc_sid=9267fe&_nc_ohc=wFkn6ryvCssAX9BcKK0&_nc_ht=scontent.fcwb2-3.fna&oh=00_AfAZ3x-Y5PPA5ui-OJIlsyXlytEB6LYD5ljSBk7qp2kKjQ&oe=6499593D',
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

    await Promise.all(
      products.map(async (product, index) =>
        this.partnerProductsService.create({
          product: product,
          partner,
          status: PartnerProductStatus.Active,
          value: 100 * (index + 1),
        }),
      ),
    );
  }
}
