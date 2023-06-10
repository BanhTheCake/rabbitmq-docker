import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateNewRequest } from './dtos/create-new.request';
import { UserEntity } from './user.schema';

@Injectable()
export class UserServices {
  constructor(private userRepository: UserRepository) {}

  async createNew(data: CreateNewRequest) {
    let existUser: UserEntity;
    try {
      existUser = await this.userRepository.findOne({
        username: data.username,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
    if (existUser) {
      throw new BadRequestException('Username has been exist.');
    }
    const user = await this.userRepository.create(data);
    return user;
  }

  async validateUser(data: CreateNewRequest) {
    let user: UserEntity;
    try {
      user = await this.userRepository.findOne(data);
    } catch (error) {}
    return user;
  }
}
