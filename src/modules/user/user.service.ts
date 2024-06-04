// imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma_client } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import { ToPagination } from 'to-pagination';

// use Injectable
@Injectable()

// export class
export class ServiceOfUser {
  async getUsers(query) {
    const { user_name, page_number, limit } = query;
    // const user =
    //   await prisma_client.$queryRaw`SELECT * FROM users WHERE username LIKE '%${user_name}%'`;
    if (user_name) {
      const user = await prisma_client.users.findMany({
        where: {
          full_name: { contains: `${user_name}` },
        },
      });
      const p_data = ToPagination(page_number, limit, user);
      return p_data;
    } else {
      const user = await prisma_client.users.findMany();
      const p_data = ToPagination(page_number, limit, user);
      return p_data;
    }
  }
  async deleteUser(query) {
    try {
      const { user_id } = query;
      await prisma_client.users.delete({
        where: {
          id: ~~user_id,
        },
      });
      return new HttpException('User deleted!', HttpStatus.OK);
    } catch (err) {
      return new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async updateUser(query) {
    const { username, password, new_password, new_username } = query;
    const user = await prisma_client.users.findUnique({
      where: {
        username,
      },
    });

    if (user?.id) {
      const boo = await bcrypt.compare(password, user.password);
      if (boo) {
        const updated_password = await bcrypt.hash(new_password, 10);

        if (updated_password) {
          await prisma_client.users.update({
            where: {
              username,
            },
            data: {
              password: updated_password,
              username: new_username,
            },
          });

          return new HttpException('Updated!', HttpStatus.OK);
        } else {
          return new HttpException(
            'INTERNAL_SERVER_ERROR',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      } else {
        return new HttpException(
          'Old password is incorrect!',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      return new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }
}
