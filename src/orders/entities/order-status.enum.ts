export enum OrderStatus {
  Created = 'created',
  CanceledByPartner = 'canceled_by_partner',
  CanceledByCustomer = 'canceled_by_customer',
  AcceptedByPartner = 'accepted_by_Partner',
  RefusedByPartner = 'refused_by_Partner',
  AwaitingExecution = 'awaiting_execution',
  InDelivery = 'in_delivery',
  Settled = 'settled',
}
