import { CreateOrderRequest, RmqService } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  constructor(private rmqService: RmqService) {}
  createInvoice(data: CreateOrderRequest, context: RmqContext) {
    this.logger.log('Creating invoice', data);
    this.rmqService.ack(context);
  }
}
