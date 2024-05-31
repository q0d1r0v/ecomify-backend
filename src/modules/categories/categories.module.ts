// imports
import { Module } from '@nestjs/common';
import { ControllerOfCategory } from './categories.controller';
import { ServiceOfCategory } from './categories.service';

// use module
@Module({
  imports: [],
  controllers: [ControllerOfCategory],
  providers: [ServiceOfCategory],
})

// export posts module class
export class ModuleOfCategory {}
