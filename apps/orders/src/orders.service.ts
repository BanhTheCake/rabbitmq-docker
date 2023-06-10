import { Injectable, Inject } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { CreateNewRequest } from './dtos/create-new.request';
import { UpdateOneRequest } from './dtos/update-one.request';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    private orderRepository: OrderRepository,
    @Inject('BILLING') private client: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createNew(data: CreateNewRequest) {
    this.client.emit({ cmd: 'Order_created' }, data);
    return this.orderRepository.create(data);
  }

  async find() {
    return this.orderRepository.find({});
  }

  async updateOne(id: string, data: UpdateOneRequest) {
    return this.orderRepository.updateOne(
      {
        _id: id,
      },
      { $set: data },
    );
  }
}
