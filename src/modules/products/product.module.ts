// imports
import { Module } from '@nestjs/common';
import { ControllerOfProduct } from './product.controller';
import { ServiceOfProduct } from './product.service';

// use module
@Module({
  controllers: [ControllerOfProduct],
  providers: [ServiceOfProduct],
})

// export product module class
export class ProductModule {}
