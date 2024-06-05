// imports
import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ServiceOfCategory } from './categories.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../validations/categories/category';

// use controller
@Controller('/')

// export posts controller class
export class ControllerOfCategory {
  constructor(private readonly controllerOfCategory: ServiceOfCategory) {}

  @Get('/api/get-categories')
  getCategories() {
    return this.controllerOfCategory.getCategories();
  }

  @Post('/admin/api/create-category')
  createCategory(@Body() body: CreateCategoryDto) {
    return this.controllerOfCategory.createCategory(body);
  }

  @Put('/admin/api/update-category')
  updateCategory(@Query() query: UpdateCategoryDto) {
    return this.controllerOfCategory.updateCategory(query);
  }
}
