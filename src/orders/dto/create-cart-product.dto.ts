import { AbstractEntityDto, ID } from '../../common';
import { CartProduct } from '../entities/cart-product.entity';
import { CustomerUser } from '../../users/entities/customer-user.entity';
import { PartnerProduct } from '../../partners/entities/partner-product.entity';
import { Order } from '../entities/order.entity';

export class CreateCartProductDto extends AbstractEntityDto<CartProduct> {
  customerId: ID;

  partnerProductId: ID;

  orderId: ID;

  toEntity() {
    return new CartProduct({
      customer: new CustomerUser({ id: this.customerId }),
      partnerProduct: new PartnerProduct({ id: this.partnerProductId }),
      order: new Order({ id: this.orderId }),
    });
  }
}
