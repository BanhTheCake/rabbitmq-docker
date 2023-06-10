import { Response } from 'express';
import { JwtServices } from './jwt/jwt.services';
import { CreateNewRequest } from './user/dtos/create-new.request';
import { UserEntity } from './user/user.schema';
import { UserServices } from './user/user.services';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UserServices,
    private jwtServices: JwtServices,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async login(data: CreateNewRequest, res: Response) {
    let user: UserEntity;
    try {
      user = await this.userServices.validateUser(data);
    } catch (error) {}
    if (!user) {
      throw new BadRequestException();
    }
    const token = await this.jwtServices.generateToken(user._id);
    res.cookie('authentication', token);
    return user;
  }
}
