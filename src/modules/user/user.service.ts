// imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma_client } from '../../prisma.service';
import * as bcrypt from 'bcrypt';

// use Injectable
@Injectable()

// export class
export class ServiceOfUser {
  async getUsers(query) {
    const { user_name } = query;
    // const user =
    //   await prisma_client.$queryRaw`SELECT * FROM users WHERE username LIKE '%${user_name}%'`;
    if (user_name) {
      const users = await prisma_client.users.findMany({
        where: {
          full_name: { contains: `${user_name}` },
        },
      });
      users.map((user) => {
        delete user.password;
        return user;
      });
      return users;
    } else {
      const users = await prisma_client.users.findMany();

      users.map((user) => {
        delete user.password;
        return user;
      });
      return users;
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
  async updateUser(body) {
    const { full_name, username, password, user_id } = body;
    const updated_password = await bcrypt.hash(password, 10);
    const user = await prisma_client.users.update({
      where: {
        id: ~~user_id,
      },
      data: {
        username,
        full_name,
        password: updated_password,
      },
    });
    return new HttpException(
      {
        data: user,
      },
      HttpStatus.OK,
    );
  }
}
