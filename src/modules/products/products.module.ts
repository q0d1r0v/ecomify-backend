import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [ProductsController],
  imports: [PrismaModule],
  providers: [ProductsService],
})
export class ProductsModule {}
