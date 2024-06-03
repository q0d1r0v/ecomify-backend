// imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma_client } from '../../prisma.service';
import * as bcrypt from 'bcrypt';

// use Injectable
@Injectable()

// export class
export class ServiceOfUser {
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
