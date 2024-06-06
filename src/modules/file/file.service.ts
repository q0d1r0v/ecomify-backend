// imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma_client } from '../../prisma.service';
import * as fs from 'fs';
import * as path from 'path';

// use Injectable
@Injectable()

// export class
export class ServiceOfFile {
  async createFile(files, body) {
    const { category_id, product_id, file_name } = body;
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
      if (file_name) {
        fs.unlink(
          path.join(__dirname, '../../../uploads/') + file_name,
          (err) => {
            if (err) throw err;
          },
        );
      }
      return new HttpException(
        {
          message: `Bad request with ${file_name}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'create file';
  }
}
