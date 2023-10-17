import { IsDefined, IsString } from 'class-validator';
import { AbstractEntityDto } from '../../common';
import { ProductCategory } from '../entities/product-category.entity';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateProductCategoryDto extends AbstractEntityDto<ProductCategory> {
  @IsDefined()
  @IsDefined({
    message: i18nValidationMessage('validation.productCategory.name.required'),
  })
  @IsString({
    message: i18nValidationMessage('validation.productCategory.name.isString'),
  })
  name: string;

  toEntity() {
    return new ProductCategory({ name: this.name });
  }
}
