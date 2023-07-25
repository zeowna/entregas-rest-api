import { Injectable } from '@nestjs/common';
import { CreateProductService } from '../products/services/create-product.service';
import { ProductStatus } from '../products/entities/product-status.enum';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { PartnerProductStatus } from '../partners/entities/partner-product-status.enum';
import { CreateProductCategoryService } from '../products/services/create-product-category.service';
import { CreateProductCategoryDto } from '../products/dto/create-product-category.dto';
import { randomUUID } from 'crypto';
import { CreateProductCategorySizeService } from '../products/services/create-product-category-size.service';
import { CreateProductCategorySizeDto } from '../products/dto/create-product-category-size.dto';
import { CreatePartnerService } from '../partners/services/create-partner.service';
import { CreatePartnerDto } from '../partners/dto/create-partner.dto';
import { CreatePartnerProductService } from '../partners/services/create-partner-product.service';
import { CreatePartnerProductDto } from '../partners/dto/create-partner-product.dto';
import { CreateAddressService } from '../addresses/services/create-address.service';
import { CreateAddressDto } from '../addresses/dto/create-address.dto';

@Injectable()
export class DbService {
  constructor(
    private readonly createProductCategoryService: CreateProductCategoryService,
    private readonly createProductCategorySizeService: CreateProductCategorySizeService,
    private readonly createProductService: CreateProductService,
    private readonly createPartnerService: CreatePartnerService,
    private readonly createAddress: CreateAddressService,
    private readonly createPartnerProductService: CreatePartnerProductService,
  ) {}

  async seed() {
    const correlationId = randomUUID();

    const category = await this.createProductCategoryService.execute(
      new CreateProductCategoryDto({ name: 'Botijões de Gás' }),
      correlationId,
    );

    const sizes = await Promise.all([
      this.createProductCategorySizeService.execute(
        new CreateProductCategorySizeDto({
          categoryId: category.id,
          name: 'P13',
        }),
        correlationId,
      ),
      this.createProductCategorySizeService.execute(
        new CreateProductCategorySizeDto({
          categoryId: category.id,
          name: 'P20',
        }),
        correlationId,
      ),

      this.createProductCategorySizeService.execute(
        new CreateProductCategorySizeDto({
          categoryId: category.id,
          name: 'P45',
        }),
        correlationId,
      ),
      this.createProductCategorySizeService.execute(
        new CreateProductCategorySizeDto({
          categoryId: category.id,
          name: 'P90',
        }),
        correlationId,
      ),
    ]);

    const products = await Promise.all(
      sizes.map(async (size) =>
        this.createProductService.execute(
          new CreateProductDto({
            name: 'Botijão',
            category,
            size: size.name,
            status: ProductStatus.Active,
          }),
          correlationId,
        ),
      ),
    );

    const address = await this.createAddress.execute(
      new CreateAddressDto({
        cep: '806200070',
        city: 'Curitiba',
        complement: 'Loja 1',
        neighbourhood: 'Água Verde',
        number: 293,
        state: 'PR',
        street: 'Rua Mato Grosso',
      }),
      correlationId,
    );

    const partner = await this.createPartnerService.execute(
      new CreatePartnerDto({
        name: 'Saldanha Distribuidora',
        cnpj: '12312312',
        pictureURI:
          'https://scontent.fcwb2-3.fna.fbcdn.net/v/t39.30808-6/245969868_3154848254745379_1920533050163387630_n.jpg?_nc_cat=103&cb=99be929b-3346023f&ccb=1-7&_nc_sid=9267fe&_nc_ohc=wFkn6ryvCssAX9BcKK0&_nc_ht=scontent.fcwb2-3.fna&oh=00_AfAZ3x-Y5PPA5ui-OJIlsyXlytEB6LYD5ljSBk7qp2kKjQ&oe=6499593D',
        addressId: address.id,
      }),
      correlationId,
    );

    await Promise.all(
      products.map(async (product, index) =>
        this.createPartnerProductService.execute(
          new CreatePartnerProductDto({
            productId: product.id,
            partnerId: partner.id,
            status: PartnerProductStatus.Active,
            value: 100 * (index + 1) * 100,
          }),
          correlationId,
        ),
      ),
    );
  }
}
