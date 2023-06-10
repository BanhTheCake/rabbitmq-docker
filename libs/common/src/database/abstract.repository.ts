import { Logger } from '@nestjs/common';
import {
  Model,
  Connection,
  FilterQuery,
  ProjectionType,
  UpdateQuery,
  Types,
  SaveOptions,
} from 'mongoose';
import { AbstractSchema } from './abstract.schema';

export abstract class AbstractRepository<T extends AbstractSchema> {
  protected readonly logger: Logger;

  constructor(
    protected EntityModel: Model<T>,
    protected connection: Connection,
  ) {}

  async findOne(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T>,
  ): Promise<T | null> {
    return this.EntityModel.findOne(filterQuery, projection, {
      lean: true,
    }).exec();
  }

  async find(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T>,
  ): Promise<T[] | null> {
    return this.EntityModel.find(filterQuery, projection, {
      lean: true,
    }).exec();
  }

  async findById(
    id: string,
    projection?: ProjectionType<T>,
  ): Promise<T | null> {
    return this.EntityModel.findById(id, projection, {
      lean: true,
    }).exec();
  }

  async create(data: Omit<T, '_id'>, saveOptions?: SaveOptions): Promise<T> {
    const newEntity = new this.EntityModel({
      ...data,
      _id: new Types.ObjectId(),
    });
    return newEntity.save(saveOptions);
  }

  async updateOne(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<T>,
  ): Promise<T | null> {
    return this.EntityModel.findOneAndUpdate(filterQuery, updateQuery, {
      new: true,
      lean: true,
    }).exec();
  }

  async updateMany(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<T>,
  ): Promise<boolean> {
    const updateResult = await this.EntityModel.updateMany(
      filterQuery,
      updateQuery,
    ).exec();
    return updateResult.modifiedCount >= 1;
  }

  async deleteOne(filterQuery: FilterQuery<T>): Promise<T | null> {
    return this.EntityModel.findOneAndDelete(filterQuery, {
      lean: true,
    }).exec();
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.EntityModel.deleteMany(filterQuery).exec();
    return deleteResult.deletedCount >= 1;
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
