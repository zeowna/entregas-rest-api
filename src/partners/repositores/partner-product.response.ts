import { AbstractEntityPresenter } from '../../common';
import { PartnerProduct } from '../entities/partner-product.entity';
import { PartnerProductStatus } from '../entities/partner-product-status.enum';
import { PartnerResponse } from '../responses/partner.reponse';
import { ProductResponse } from '../../products/responses/product.response';

export class PartnerProductResponse extends AbstractEntityPresenter<PartnerProduct> {
  name: string;

  partner: PartnerResponse;

  product: ProductResponse;

  value: number;

  inStockQuantity: number;

  status: PartnerProductStatus;

  constructor(props: PartnerProduct) {
    super(props);
    this.name = props?.name;
    this.partner = props?.partner?.present();
    this.product = props?.product?.present();
    this.value = props?.value;
    this.inStockQuantity = props?.inStockQuantity;
    this.status = props?.status;
  }
}
