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
@Controller('/')

// export posts controller class
export class ControllerOfUser {
  constructor(private readonly controllerOfUser: ServiceOfUser) {}

  @Get('/admin/api/get-users')
  @ApiQuery({ name: 'user_name', required: false, type: String })
  @ApiQuery({ name: 'page_number', required: true, type: Number })
  @ApiQuery({ name: 'limit', required: true, type: Number })
  getUsers(@Query() query: GetUsersDto) {
    return this.controllerOfUser.getUsers(query);
  }

  @Put('/admin/api/update-user')
  updateUser(@Query() query: UpdateUserDto) {
    return this.controllerOfUser.updateUser(query);
  }

  @Delete('/admin/api/delete-user')
  deleteUser(@Query() query: DeleteUserDto) {
    return this.controllerOfUser.deleteUser(query);
  }
}
