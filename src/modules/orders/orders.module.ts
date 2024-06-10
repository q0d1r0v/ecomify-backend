// imports
import { Module } from '@nestjs/common';
import { ControllerOfOrder } from './orders.controller';
import { ServiceOfOrders } from './orders.service';

// use module
@Module({
  controllers: [ControllerOfOrder],
  providers: [ServiceOfOrders],
})

// export order module class
export class OrderModule {}
