import { AbstractSchema } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<OrderEntity>;

@Schema({
  versionKey: false,
  collection: 'orders',
  timestamps: true,
})
export class OrderEntity extends AbstractSchema {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  phoneNumber: string;
}

export const OrderSchema = SchemaFactory.createForClass(OrderEntity);
