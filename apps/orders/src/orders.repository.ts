import { AbstractRepository } from '@app/common';
import { OrderEntity } from './orders.shema';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository extends AbstractRepository<OrderEntity> {
  protected readonly logger = new Logger(OrderRepository.name);

  constructor(
    @InjectModel(OrderEntity.name) OrderEntity: Model<OrderEntity>,
    @InjectConnection() connection: Connection,
  ) {
    super(OrderEntity, connection);
  }
}
