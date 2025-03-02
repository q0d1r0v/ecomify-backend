import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('admin')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/api/load/products')
  loadProducts() {
    return this.productsService.loadProducts();
  }
}
