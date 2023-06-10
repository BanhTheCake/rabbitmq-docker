import { AbstractSchema } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({
  versionKey: false,
  collection: 'users',
})
export class UserEntity extends AbstractSchema {
  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
