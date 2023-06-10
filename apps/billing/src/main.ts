import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { RabbitMQServices } from '@app/common/rabbitmq/rabbitmq.services';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);

  const rabbitMQServices = app.get<RabbitMQServices>(RabbitMQServices);
  app.connectMicroservice<MicroserviceOptions>(
    rabbitMQServices.getOptions('BILLING'),
  );

  await app.startAllMicroservices();
}
bootstrap();
