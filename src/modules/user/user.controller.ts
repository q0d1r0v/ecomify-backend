// imports
import { Controller, Put, Query, Delete } from '@nestjs/common';
import { ServiceOfUser } from './user.service';
import { UpdateUserDto, DeleteUserDto } from '../../validations/user/user-dto';

// use controller
@Controller('api')

// export posts controller class
export class ControllerOfUser {
  constructor(private readonly controllerOfUser: ServiceOfUser) {}

  @Put('/admin/update-user')
  updateUser(@Query() query: UpdateUserDto) {
    return this.controllerOfUser.updateUser(query);
  }

  @Delete('/admin/delete-user')
  deleteUser(@Query() query: DeleteUserDto) {
    return this.controllerOfUser.deleteUser(query);
  }
}
