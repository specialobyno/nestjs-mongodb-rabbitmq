import { Inject, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE, CreateOrderRequest } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billinClient: ClientProxy,
  ) {}
  async createOrder(request: CreateOrderRequest, athentication: string) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session });
      const emmittedEvent = this.billinClient.emit('order_created', {
        request,
        Authentication: athentication,
      });
      await lastValueFrom(emmittedEvent);

      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
  async getOrders() {
    return this.ordersRepository.find({});
  }
}
