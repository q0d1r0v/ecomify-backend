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
  async getProducts(query) {
    const { lang, name, page_number, limit } = query;
    let products = [];

    if (lang === 'uz' && name) {
      products =
        await prisma_client.$queryRaw`SELECT * FROM products WHERE name_uz LIKE '%' || ${name} || '%'`;
    } else if (lang === 'ru' && name) {
      products =
        await prisma_client.$queryRaw`SELECT * FROM products WHERE name_ru LIKE '%' || ${name} || '%'`;
    } else {
      products = await prisma_client.products.findMany();
    }

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
        delete product.name_uz;
        delete product.name_ru;
        delete product.description_uz;
        delete product.description_ru;

        return product;
      }),
    );
    let with_pg_data = [];
    if (limit && page_number) {
      with_pg_data = ToPagination(page_number, limit, prs);
    } else {
      with_pg_data = ToPagination(1, 20, prs);
    }
    return {
      data: with_pg_data,
    };
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
        category_id,
        price,
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
  async changeStatusOfProduct(query) {
    const { product_id } = query;

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
}