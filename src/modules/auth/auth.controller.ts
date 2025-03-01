import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthLoginDto,
  AuthRegisterDto,
} from 'src/shared/dto/auth-dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }

  @Post('/login')
  async login(@Body() body: AuthLoginDto) {
    return this.authService.login(body);
  }
}
