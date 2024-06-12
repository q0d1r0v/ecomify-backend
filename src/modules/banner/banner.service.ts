// imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma_client } from '../../prisma.service';
import * as fs from 'fs';
import * as path from 'path';

// use Injectable
@Injectable()

// export class
export class ServiceOfBanner {
  async getBanners() {
    const banners = await prisma_client.images.findMany({
      where: {
        is_banner: true,
      },
    });

    return new HttpException(
      {
        data: banners,
      },
      HttpStatus.OK,
    );
  }

  async deleteBanner(query) {
    const { banner_id } = query;
    try {
      const banner = await prisma_client.images.delete({
        where: {
          id: ~~banner_id,
        },
      });
      if (banner.name) {
        fs.unlink(
          path.join(__dirname, '../../../uploads/') + banner?.name,
          (err) => {
            if (err) throw err;
          },
        );
      }

      return new HttpException('Deleted banner!', HttpStatus.OK);
    } catch (err) {
      return new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
