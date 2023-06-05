import { Injectable } from '@nestjs/common';
import { CreateCartProductDto } from './dto/create-cart-product.dto';
import { UpdateCartProductDto } from './dto/update-cart-product.dto';

@Injectable()
export class CartProductsService {
  create(createCartProductDto: CreateCartProductDto) {
    return 'This action adds a new cartProduct';
  }

  findAll() {
    return `This action returns all cartProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartProduct`;
  }

  update(id: number, updateCartProductDto: UpdateCartProductDto) {
    return `This action updates a #${id} cartProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartProduct`;
  }
}
