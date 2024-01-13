import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Order } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class OrdersRepository extends AbstractRepository<Order> {
  protected readonly logger: Logger = new Logger(Order.name);
  constructor(
    @InjectModel(Order.name) orderModel: Model<Order>,
    connection: Connection,
  ) {
    super(orderModel, connection);
  }
}
