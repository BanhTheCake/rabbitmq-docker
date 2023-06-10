import { AbstractRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.schema';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository extends AbstractRepository<UserEntity> {
  constructor(
    @InjectModel(UserEntity.name) UserEntity: Model<UserEntity>,
    @InjectConnection() connection: Connection,
  ) {
    super(UserEntity, connection);
  }
}
