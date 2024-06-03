// imports
import { Controller, Get } from '@nestjs/common';
import { ServiceOfCategory } from './categories.service';

// use controller
@Controller()

// export posts controller class
export class ControllerOfCategory {
  constructor(private readonly controllerOfCategory: ServiceOfCategory) {}

  @Get('/api/get-categories')
  getCategories() {
    return this.controllerOfCategory.getCategories();
  }
}
