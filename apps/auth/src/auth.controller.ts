import { Controller, Get, Res, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateNewRequest } from './user/dtos/create-new.request';
import { Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserEntity } from './user/user.schema';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post()
  login(
    @Body() data: CreateNewRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(data, res);
  }

  @MessagePattern({ cmd: 'validate_user' })
  @UseGuards(JwtAuthGuard)
  validateUser(@CurrentUser() user: UserEntity) {
    return user;
  }
}
