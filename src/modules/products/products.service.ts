import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async loadProducts() {
    try {
      const products = await this.prisma.product.findMany();

      return { message: 'status ok', products };
    } catch (error: unknown) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Xatolik yuz berdi',
      );
    }
  }
}
