import { IsDefined, IsString } from 'class-validator';

export class CreateProductCategoryDto {
  @IsDefined()
  @IsString()
  name: string;
}
