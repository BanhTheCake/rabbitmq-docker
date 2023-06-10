import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RabbitMQServices } from '@app/common/rabbitmq/rabbitmq.services';
import { JwtGuardCommon } from '@app/common';

@Controller()
export class BillingController {
  private readonly logger = new Logger(BillingController.name);

  constructor(
    private readonly billingService: BillingService,
    private rmqServices: RabbitMQServices,
  ) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @MessagePattern({ cmd: 'Order_created' })
  createNewOrder(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.log('Billing .... ');
    this.logger.log(data);
    this.rmqServices.ackMessage(context);
  }

  @MessagePattern({ cmd: 'hello' })
  @UseGuards(JwtGuardCommon)
  hello(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.log('hello .... ');
    this.logger.log(data);
    this.rmqServices.ackMessage(context);
  }
}
