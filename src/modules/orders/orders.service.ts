// imports
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma_client } from '../../prisma.service';
import { ToPagination } from 'to-pagination';

// use Injectable
@Injectable()

// export class
export class ServiceOfOrders {
  async createOrder(body) {
    const {
      full_name,
      address,
      phone_number,
      description,
      product_id,
      additional_phone_number,
    } = body;
    try {
      await prisma_client.orders.create({
        data: {
          full_name,
          address,
          phone_number,
          additional_phone_number: additional_phone_number
            ? additional_phone_number
            : '',
          description,
          product_id: ~~product_id,
        },
      });
      return new HttpException('Created order!', HttpStatus.CREATED);
    } catch (err) {
      return new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async doneOrder(query) {
    const { order_id, status } = query;
    try {
      await prisma_client.orders.update({
        where: {
          id: ~~order_id,
        },
        data: {
          done: status,
        },
      });
      return new HttpException('Done order!', HttpStatus.OK);
    } catch (err) {
      return new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getActiveOrders(query) {
    const { page_number, limit, status, order_id } = query;

    let active_orders = [];

    if (status === 'active') {
      active_orders = await prisma_client.orders.findMany({
        where: {
          done: false,
        },
      });
    } else if (status === 'done') {
      active_orders = await prisma_client.orders.findMany({
        where: {
          done: true,
        },
      });
    } else {
      active_orders = await prisma_client.orders.findMany();
    }

    if (order_id) {
      active_orders = await prisma_client.orders.findMany({
        where: {
          id: ~~order_id,
        },
      });
    }

    const with_pg = ToPagination(page_number, limit, active_orders);

    return new HttpException(
      {
        data: with_pg,
      },
      HttpStatus.OK,
    );
  }

  async getOrdersWithId(query) {
    const { order_id } = query;
    const order = await prisma_client.orders.findUnique({
      where: {
        id: ~~order_id,
      },
    });

    return new HttpException(
      {
        data: order,
      },
      HttpStatus.OK,
    );
  }
}
