// imports
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// use Injectable
@Injectable()

// export auth middleware class
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split('Bearer ')[1];
        jwt.verify(token, process.env.JWT_KEY, (err) => {
          if (err) throw err;
          next();
        });
      } catch (e) {
        res.status(401).send({
          message: 'Invalid token!',
        });
      }
    } else {
      res.status(401).send({
        message: 'Unauthorized',
      });
    }
  }
}
