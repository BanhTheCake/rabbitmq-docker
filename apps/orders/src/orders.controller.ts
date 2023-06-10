import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Inject,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateNewRequest } from './dtos/create-new.request';
import { UpdateOneRequest } from './dtos/update-one.request';
import { JwtGuardCommon } from '@app/common';
import { Request } from 'express';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('BILLING') private client: ClientProxy,
  ) {}

  @UseGuards(JwtGuardCommon)
  @Get('hello')
  getHello(@Req() req: Request): string {
    this.client.emit(
      { cmd: 'hello' },
      { authentication: req.cookies?.authentication },
    );
    return this.ordersService.getHello();
  }

  @Post()
  createNew(@Body() data: CreateNewRequest) {
    return this.ordersService.createNew(data);
  }

  @Get()
  getAll() {
    return this.ordersService.find();
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() data: UpdateOneRequest) {
    return this.ordersService.updateOne(id, data);
  }
}
