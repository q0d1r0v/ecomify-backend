// imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma_client } from '../../prisma.service';
import * as path from 'path';
import * as fs from 'fs';

// use Injectable
@Injectable()

// export class
export class ServiceOfCategory {
  async getCategories(query) {
    const { lang } = query;

    const categories = await prisma_client.categories.findMany();

    const cts = await Promise.all(
      categories.map(async (category: any) => {
        category.images = await prisma_client.images.findMany({
          where: {
            category_id: category.id,
          },
        });
        if (lang === 'uz') {
          category.category_name = category.name_uz;
        } else {
          category.category_name = category.name_ru;
        }
        delete category.name_uz;
        delete category.name_ru;

        return category;
      }),
    );
    return {
      data: cts,
    };
  }
  async createCategory(body) {
    const { name_uz, name_ru } = body;
    const category_uz = await prisma_client.categories.findUnique({
      where: {
        name_uz,
      },
    });
    const category_ru = await prisma_client.categories.findUnique({
      where: {
        name_ru,
      },
    });
    if (category_uz === null && category_ru === null) {
      const ct = await prisma_client.categories.create({
        data: {
          name_uz,
          name_ru,
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
    const { category_id, name_uz, name_ru } = query;
    const category = await prisma_client.categories.findUnique({
      where: {
        id: category_id,
      },
    });
    if (category !== null) {
      await prisma_client.categories.update({
        where: {
          id: category_id,
        },
        data: {
          name_uz,
          name_ru,
        },
      });
      return new HttpException('Updated category!', HttpStatus.OK);
    } else {
      return new HttpException(
        "We don't have this category!",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async deleteCategory(query) {
    const category = await prisma_client.categories.findUnique({
      where: { id: ~~query.category_id },
    });
    if (category !== null) {
      const images = await prisma_client.images.findMany({
        where: {
          category_id: ~~category.id,
        },
      });
      if (images.length) {
        images.map(async (image) => {
          fs.unlink(
            path.join(__dirname, '../../../uploads/') + image.name,
            (err) => {
              if (err) throw err;
            },
          );
          await prisma_client.images.delete({
            where: {
              name: image.name,
            },
          });
        });
        await prisma_client.categories.delete({
          where: {
            id: ~~query.category_id,
          },
        });
      }
      return new HttpException('Deleted category!', HttpStatus.OK);
    } else {
      return new HttpException(
        "We don't have this category!",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
