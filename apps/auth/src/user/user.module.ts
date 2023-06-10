import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserServices } from './user.services';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserServices, UserRepository],
  exports: [UserServices, UserRepository],
})
export class UserModule {}
