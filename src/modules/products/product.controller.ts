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
  UpdateProductInfoDto,
  ShowOrderProductDto,
} from '../../validations/products/product';

// use controller
@Controller('/')

// export product controller class
export class ControllerOfProduct {
  constructor(private readonly controllerOfProduct: ServiceOfProduct) {}

  @Get('/admin/api/show-order-product')
  showOrderProduct(@Query() query: ShowOrderProductDto) {
    return this.controllerOfProduct.showOrderProduct(query);
  }

  @Get('/api/get-products')
  getCategories(@Query() query: GetProductsDto) {
    return this.controllerOfProduct.getProducts(query);
  }

  @Post('/admin/api/create-product')
  createProduct(@Body() body: CreateProductDto) {
    return this.controllerOfProduct.createProduct(body);
  }

  @Put('/admin/api/update-status-of-product')
  updateStatusOfProduct(@Body() body: UpdateActiveOfProductDto) {
    return this.controllerOfProduct.changeStatusOfProduct(body);
  }

  @Put('/admin/api/update-product-info')
  updateProductInfo(@Body() body: UpdateProductInfoDto) {
    return this.controllerOfProduct.updateProductInfo(body);
  }

  @Delete('/admin/api/delete-product')
  deleteProduct(@Query() query: DeleteProductDto) {
    return this.controllerOfProduct.deleteProduct(query);
  }
}
