// imports
import { Injectable } from '@nestjs/common';
import { prisma_client } from '../../prisma.service';

// use Injectable
@Injectable()

// export class
export class ServiceOfCategory {
  async getCategories() {
    return prisma_client.categories.findMany();
  }
}
