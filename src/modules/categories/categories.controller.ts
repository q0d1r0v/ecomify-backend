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
import { ServiceOfCategory } from './categories.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  GetCategoriesDto,
  DeleteCategoryDto,
} from '../../validations/categories/category';

// use controller
@Controller('/')

// export posts controller class
export class ControllerOfCategory {
  constructor(private readonly controllerOfCategory: ServiceOfCategory) {}

  @Get('/admin/api/get-all-categories')
  getAllCategories() {
    return this.controllerOfCategory.getAllCategories();
  }

  @Get('/api/get-categories')
  getCategories(@Query() query: GetCategoriesDto) {
    return this.controllerOfCategory.getCategories(query);
  }

  @Post('/admin/api/create-category')
  createCategory(@Body() body: CreateCategoryDto) {
    return this.controllerOfCategory.createCategory(body);
  }

  @Put('/admin/api/update-category')
  updateCategory(@Body() body: UpdateCategoryDto) {
    return this.controllerOfCategory.updateCategory(body);
  }

  @Delete('/admin/api/delete-category')
  deleteCategory(@Query() query: DeleteCategoryDto) {
    return this.controllerOfCategory.deleteCategory(query);
  }
}
