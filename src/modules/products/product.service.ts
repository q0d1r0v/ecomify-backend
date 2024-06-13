// imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma_client } from '../../prisma.service';
import { ToPagination } from 'to-pagination';
import * as fs from 'fs';
import * as path from 'path';

// use Injectable
@Injectable()

// export class
export class ServiceOfProduct {
  async showOrderProduct(query) {
    const { product_id } = query;

    try {
      const product = await prisma_client.products.findUnique({
        where: {
          id: ~~product_id,
        },
      });

      return new HttpException({ data: product }, HttpStatus.OK);
    } catch (err) {
      return new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getProducts(query) {
    const { lang, name, page_number, limit } = query;
    const products: any[] =
      await prisma_client.$queryRaw`SELECT * FROM products WHERE name_uz LIKE '%' || ${name} || '%' OR name_ru LIKE '%' || ${name} || '%'`;
    const prs = await Promise.all(
      products.map(async (product: any) => {
        product.images = await prisma_client.images.findMany({
          where: {
            product_id: ~~product.id,
          },
        });
        if (lang === 'uz') {
          product.name = product.name_uz;
          product.description = product.description_uz;
        } else {
          product.name = product.name_ru;
          product.description = product.description_ru;
        }

        return product;
      }),
    );
    let with_pg_data = [];
    if (limit && page_number) {
      with_pg_data = ToPagination(page_number, limit, prs);
    } else {
      with_pg_data = ToPagination(1, 20, prs);
    }
    return new HttpException(
      {
        data: with_pg_data,
      },
      HttpStatus.OK,
    );
  }

  async createProduct(body) {
    const {
      name_uz,
      name_ru,
      description_uz,
      description_ru,
      category_id,
      price,
    } = body;
    const product = await prisma_client.products.create({
      data: {
        name_uz,
        name_ru,
        description_uz,
        description_ru,
        category_id: ~~category_id,
        price: ~~price,
      },
    });
    return new HttpException(
      {
        data: product,
        message: 'Created product!',
      },
      HttpStatus.CREATED,
    );
  }

  async deleteProduct(query) {
    const product = await prisma_client.products.findUnique({
      where: { id: ~~query.product_id },
    });
    if (product !== null) {
      const images = await prisma_client.images.findMany({
        where: {
          product_id: ~~product.id,
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
        await prisma_client.products.delete({
          where: {
            id: ~~query.product_id,
          },
        });
      }
      return new HttpException('Deleted product!', HttpStatus.OK);
    } else {
      return new HttpException(
        "We don't have this product!",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async changeStatusOfProduct(body) {
    const { product_id } = body;

    const product = await prisma_client.products.findUnique({
      where: {
        id: ~~product_id,
      },
    });

    if (product !== null) {
      await prisma_client.products.update({
        where: {
          id: ~~product_id,
        },
        data: {
          active: !product.active,
        },
      });

      return new HttpException('Updated product!', HttpStatus.OK);
    } else {
      return new HttpException(
        "We don't have this product!",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async updateProductInfo(body) {
    const {
      product_id,
      name_uz,
      name_ru,
      price,
      description_uz,
      description_ru,
      category_id,
    } = body;

    try {
      await prisma_client.products.update({
        where: {
          id: ~~product_id,
        },
        data: {
          name_uz,
          name_ru,
          price: ~~price,
          description_uz,
          description_ru,
          category_id,
        },
      });
      return new HttpException('Updated product!', HttpStatus.OK);
    } catch (err) {
      return new HttpException(
        'INTERNAL_SERVER_ERROR!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
