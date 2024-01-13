import { Controller, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateOrderRequest, JwtAuthGuard } from '@app/common';
@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @EventPattern('order_created')
  @UseGuards(JwtAuthGuard)
  async handleOrderCreated(
    @Payload() data: CreateOrderRequest,
    @Ctx() context: RmqContext,
  ) {
    return this.billingService.createInvoice(data, context);
  }
}
