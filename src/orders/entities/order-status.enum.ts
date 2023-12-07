export enum OrderStatus {
  Created = 'created',
  AwaitingPartner = 'awaiting_partner',
  CanceledByPartner = 'canceled_by_partner',
  CanceledByCustomer = 'canceled_by_customer',
  AcceptedByPartner = 'accepted_by_partner',
  RefusedByPartner = 'refused_by_partner',
  AwaitingExecution = 'awaiting_execution',
  InDelivery = 'in_delivery',
  Settled = 'settled',
}
