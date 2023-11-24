import { ConflictException, Injectable } from '@nestjs/common';
import { AbstractService, ID, NestLoggerService } from '../../common';
import { Order } from '../entities/order.entity';
import { OrdersTypeORMRepository } from '../repositories/orders-typeorm.repository';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { DateTime } from 'luxon';
import { FindOrderByIdService } from './find-order-by-id.service';
import { OrderStatus } from '../entities/order-status.enum';
import { I18nContext } from 'nestjs-i18n';
import { UpdatePartnerProductService } from '../../partners/services/update-partner-product.service';
import { UpdatePartnerProductDto } from '../../partners/dto/update-partner-product.dto';

@Injectable()
export class UpdateOrderStatusService extends AbstractService<Order> {
  constructor(
    private readonly ordersRepository: OrdersTypeORMRepository,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly updatePartnerProductService: UpdatePartnerProductService,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(
    id: ID,
    updateOrderStatusDto: UpdateOrderStatusDto,
    correlationId: string,
    i18n: I18nContext,
  ) {
    this.logBefore({
      updateOrderStatusDto,
      correlationId,
    });

    try {
      const existing = await this.findOrderByIdService.execute(
        id,
        correlationId,
      );

      const isAlreadySettled = [
        OrderStatus.CanceledByCustomer,
        OrderStatus.CanceledByPartner,
        OrderStatus.RefusedByPartner,
        OrderStatus.Settled,
      ];

      const isCancelationStatus = [
        OrderStatus.CanceledByCustomer,
        OrderStatus.CanceledByPartner,
        OrderStatus.RefusedByPartner,
      ];

      if (isAlreadySettled.includes(existing.status)) {
        throw new ConflictException(
          i18n.translate('validation.Order.status.isAlreadySettled'),
        );
      }

      const updated = await this.ordersRepository.update(
        id,
        new Order({
          ...updateOrderStatusDto.toEntity(),
          statusUpdatedAt: DateTime.now().toJSDate(),
        }),
      );

      if (isCancelationStatus.includes(updated.status)) {
        for (const cartProduct of updated.cart) {
          await this.updatePartnerProductService.execute(
            cartProduct.id,
            new UpdatePartnerProductDto({
              inStockQuantity:
                cartProduct.quantity +
                cartProduct.partnerProduct.inStockQuantity,
            }),
            correlationId,
          );
        }
      }

      this.logAfter({
        updateOrderStatusDto,
        correlationId,
        updated,
        success: true,
      });

      return updated;
    } catch (err) {
      this.logAfter({
        err,
        updateOrderStatusDto,
        correlationId,
        success: false,
      });
    }
  }
}
