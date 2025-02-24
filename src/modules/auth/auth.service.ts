import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async loadUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
