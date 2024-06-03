// imports
import { Module } from '@nestjs/common';
import { ControllerOfUser } from './user.controller';
import { ServiceOfUser } from './user.service';

// use module
@Module({
  imports: [],
  controllers: [ControllerOfUser],
  providers: [ServiceOfUser],
})

// export auth module class
export class UserModule {}
