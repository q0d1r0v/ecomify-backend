// imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ServiceOfOrders } from './orders.service';
import {
  CreateOrderDto,
  DoneOrderDto,
  GetActiveOrdersDto,
  GetOrdersWithDateDto,
  GetOrdersWithIdDto,
} from 'src/validations/order/order';

// use controller
@Controller('/')

// export order controller class
export class ControllerOfOrder {
  constructor(private readonly controllerOfOrder: ServiceOfOrders) {}

  @Get('/admin/api/get-orders-dashboard')
  getDashboardOrders(@Query() query: GetOrdersWithDateDto) {
    return this.controllerOfOrder.getDashboardOrders(query);
  }

  @Get('/admin/api/get-orders')
  getActiveOrders(@Query() query: GetActiveOrdersDto) {
    return this.controllerOfOrder.getActiveOrders(query);
  }

  @Get('/admin/api/get-orders-with-id')
  getOrdersWithId(@Query() query: GetOrdersWithIdDto) {
    return this.controllerOfOrder.getOrdersWithId(query);
  }

  @Post('/api/create-order')
  getBanners(@Body() body: CreateOrderDto) {
    return this.controllerOfOrder.createOrder(body);
  }

  @Put('/admin/api/update-order')
  doneOrder(@Body() body: DoneOrderDto) {
    return this.controllerOfOrder.doneOrder(body);
  }
}
