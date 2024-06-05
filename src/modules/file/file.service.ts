// imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma_client } from '../../prisma.service';

// use Injectable
@Injectable()

// export class
export class ServiceOfFile {
  async createFile(files, body) {
    const { category_id, product_id } = body;
    if (category_id) {
      files.map(async (file) => {
        await prisma_client.images.create({
          data: {
            category_id: ~~category_id,
            name: file.filename,
          },
        });
        return new HttpException('Created category!', HttpStatus.CREATED);
      });
    } else if (product_id) {
      files.map(async (file) => {
        await prisma_client.images.create({
          data: {
            product_id: ~~product_id,
            name: file.filename,
          },
        });
        return new HttpException('Created product!', HttpStatus.CREATED);
      });
    } else {
      return new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
    return 'create file';
  }
}
