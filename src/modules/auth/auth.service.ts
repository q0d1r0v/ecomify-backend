import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  register(body) {
    try {
      console.log(body);
    } catch (error) {
      throw new Error(error);
    }
  }
}
