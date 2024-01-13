import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest, JwtAuthGuard } from '@app/common';
import { Request } from 'express';

@Controller('orders')
export class OrdersController {
  private logger: Logger = new Logger(OrdersController.name);
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: Request) {
    const authentication = req.cookies?.Authentication;
    return await this.ordersService.createOrder(request, authentication);
  }
  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }
}
