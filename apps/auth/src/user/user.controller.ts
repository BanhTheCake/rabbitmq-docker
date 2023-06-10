import { Body, Controller, Post } from '@nestjs/common';
import { UserServices } from './user.services';
import { CreateNewRequest } from './dtos/create-new.request';

@Controller('users')
export class UserController {
  constructor(private userServices: UserServices) {}

  @Post()
  createUser(@Body() data: CreateNewRequest) {
    return this.userServices.createNew(data);
  }
}
