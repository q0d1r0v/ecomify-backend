// imports
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// use module
@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})

// export auth module class
export class AuthModule {}
