import { RabbitMQServices } from '@app/common/rabbitmq/rabbitmq.services';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.setGlobalPrefix('auth');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const rabbitMQServices = app.get<RabbitMQServices>(RabbitMQServices);
  app.connectMicroservice(rabbitMQServices.getOptions('AUTH', true));

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
