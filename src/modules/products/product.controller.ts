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
import { ServiceOfProduct } from './product.service';
import {
  GetProductsDto,
  CreateProductDto,
  DeleteProductDto,
  UpdateActiveOfProductDto,
} from '../../validations/products/product';

// use controller
@Controller('/')

// export product controller class
export class ControllerOfProduct {
  constructor(private readonly controllerOfProduct: ServiceOfProduct) {}

  @Get('/api/get-products')
  getCategories(@Query() query: GetProductsDto) {
    return this.controllerOfProduct.getProducts(query);
  }

  @Post('/admin/api/create-product')
  createProduct(@Body() body: CreateProductDto) {
    return this.controllerOfProduct.createProduct(body);
  }

  @Put('/admin/api/update-status-of-product')
  updateStatusOfProduct(@Query() query: UpdateActiveOfProductDto) {
    return this.controllerOfProduct.changeStatusOfProduct(query);
  }

  @Delete('/admin/api/delete-product')
  deleteProduct(@Query() query: DeleteProductDto) {
    return this.controllerOfProduct.deleteProduct(query);
  }
}
