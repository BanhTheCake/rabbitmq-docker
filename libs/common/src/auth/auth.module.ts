import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import * as cookieParser from 'cookie-parser';

@Module({
  imports: [RabbitMQModule.register('AUTH')],
  exports: [RabbitMQModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
