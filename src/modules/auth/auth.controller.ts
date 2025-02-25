import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { AuthRegisterDto } from 'src/shared/dto/auth-dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }
}
