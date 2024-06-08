// imports
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { prisma_client } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

// use injectable
@Injectable()

// export service class
export class AuthService {
  async login(body) {
    try {
      const { username, password } = body;

      const user = await prisma_client.users.findUnique({
        where: {
          username,
        },
      });

      if (user?.id) {
        const boo = await bcrypt.compare(password, user?.password);

        if (boo) {
          const access_token = await jwt.sign(user, process.env.JWT_KEY, {
            expiresIn: '72h',
          });

          delete user.password;
          return new HttpException(
            {
              user,
              access_token,
            },
            HttpStatus.OK,
          );
        } else {
          return new HttpException(
            'Username or password is invalid!',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        return new HttpException('User not found!', HttpStatus.BAD_REQUEST);
      }
    } catch (err: any) {
      return new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async register(body) {
    try {
      const { username, full_name, password } = body;
      const user = await prisma_client.users.findUnique({
        where: {
          username,
        },
      });
      if (process.env.register_secret_key === body.register_secret_key) {
        if (!user?.id) {
          const hashed_password = await bcrypt.hash(password, 10);

          if (hashed_password) {
            await prisma_client.users.create({
              data: {
                username,
                full_name,
                password: hashed_password,
              },
            });
            return new HttpException('User created!', HttpStatus.CREATED);
          } else {
            return new HttpException(
              'INTERNAL_SERVER_ERROR!',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
        } else {
          return new HttpException(
            'We have already this user!',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        return new HttpException('Invalid secret key!', HttpStatus.BAD_REQUEST);
      }
    } catch (err: any) {
      return new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
