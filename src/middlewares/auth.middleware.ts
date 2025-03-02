import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

// Express Request tipini kengaytirish
interface RequestWithUser extends Request {
  user: Record<string, any>;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async use(
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Token taqdim etilmagan');
      }

      const token = authHeader.split(' ')[1];

      const decoded: { id: string } = this.jwtService.verify(token);

      const user = await this.prisma.user.findUnique({
        where: { id: decoded.id }, // `id` token ichida bo‘lishi kerak
      });

      if (!user) {
        throw new UnauthorizedException(
          'Foydalanuvchi topilmadi yoki bloklangan',
        );
      }
      req.user = user;
      next();
    } catch (error: any) {
      const err = error as Error;
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token muddati tugagan');
      } else if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token yaroqsiz');
      } else {
        throw new UnauthorizedException('Autentifikatsiya xatosi');
      }
    }
  }
}
