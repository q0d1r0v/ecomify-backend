import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  AuthLoginDto,
  AuthRegisterDto,
} from 'src/shared/dto/auth-dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: AuthRegisterDto) {
    try {
      const { phone_number, password, full_name } = body;

      const existingUser = await this.prisma.user.findUnique({
        where: { phone_number },
      });

      if (existingUser) {
        throw new BadRequestException(
          'Bu telefon raqami allaqachon ro‘yxatdan o‘tgan',
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.prisma.user.create({
        data: {
          full_name,
          phone_number,
          password: hashedPassword,
        },
      });

      return { message: 'Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi', user };
    } catch (error: unknown) {
      throw new BadRequestException(
        error instanceof Error
          ? error.message
          : 'Ro‘yxatdan o‘tishda xatolik yuz berdi',
      );
    }
  }

  async login(body: AuthLoginDto): Promise<{ message: string; token: string }> {
    const { phone_number, password } = body;

    try {
      const user = await this.prisma.user.findUnique({
        where: { phone_number },
      });

      if (!user) {
        throw new UnauthorizedException("Telefon raqami yoki parol noto'g'ri");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException("Telefon raqami yoki parol noto'g'ri");
      }

      const token = this.jwtService.sign({
        id: user.id,
        phone_number: user.phone_number,
      });

      return { message: 'Kirish muvaffaqiyatli', token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException(
        error instanceof Error ? error.message : 'Kirishda xatolik yuz berdi',
      );
    }
  }
}
