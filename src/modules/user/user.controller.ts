// imports
import { Controller, Put, Query, Delete, Get } from '@nestjs/common';
import { ServiceOfUser } from './user.service';
import {
  UpdateUserDto,
  DeleteUserDto,
  GetUsersDto,
} from '../../validations/user/user-dto';
import { ApiQuery } from '@nestjs/swagger';

// use controller
@Controller('api')

// export posts controller class
export class ControllerOfUser {
  constructor(private readonly controllerOfUser: ServiceOfUser) {}

  @Get('/admin/get-users')
  @ApiQuery({ name: 'user_name', required: false, type: String })
  @ApiQuery({ name: 'page_number', required: true, type: Number })
  @ApiQuery({ name: 'limit', required: true, type: Number })
  getUsers(@Query() query: GetUsersDto) {
    return this.controllerOfUser.getUsers(query);
  }

  @Put('/admin/update-user')
  updateUser(@Query() query: UpdateUserDto) {
    return this.controllerOfUser.updateUser(query);
  }

  @Delete('/admin/delete-user')
  deleteUser(@Query() query: DeleteUserDto) {
    return this.controllerOfUser.deleteUser(query);
  }
}
