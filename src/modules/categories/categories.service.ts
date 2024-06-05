// imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma_client } from '../../prisma.service';

// use Injectable
@Injectable()

// export class
export class ServiceOfCategory {
  async getCategories() {
    const categories = await prisma_client.categories.findMany();

    const cts = await Promise.all(
      categories.map(async (category: any) => {
        category.images = await prisma_client.images.findMany({
          where: {
            category_id: category.id,
          },
        });

        return category;
      }),
    );
    return {
      data: cts,
    };
  }
  async createCategory(body) {
    const { name } = body;
    const category = await prisma_client.categories.findUnique({
      where: {
        title: name,
      },
    });
    if (!category?.id) {
      const ct = await prisma_client.categories.create({
        data: {
          title: name,
        },
      });

      return new HttpException(
        {
          message: 'Created category!',
          data: ct,
        },
        HttpStatus.CREATED,
      );
    } else {
      return new HttpException(
        'We have this category!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateCategory(query) {
    const { category_id, name } = query;
    const category = await prisma_client.categories.findUnique({
      where: {
        title: name,
      },
    });
    if (!category?.id) {
      await prisma_client.categories.update({
        where: {
          id: ~~category_id,
        },
        data: {
          title: name,
        },
      });
      return new HttpException('Updated category!', HttpStatus.OK);
    } else {
      return new HttpException(
        'We have already this category!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
