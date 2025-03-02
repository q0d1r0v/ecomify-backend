import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  controllers: [AuthController],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, AuthMiddleware],
  exports: [JwtModule],
})
export class AuthModule {}
