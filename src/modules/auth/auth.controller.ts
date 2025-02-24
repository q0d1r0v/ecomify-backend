import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/load/users')
  async loadUsers(): Promise<User[]> {
    return await this.authService.loadUsers();
  }
}
