import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, RabbitMQModule, AuthModule } from '@app/common';
import { OrderEntity, OrderSchema } from './orders.shema';
import { OrderRepository } from './orders.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/orders/.env',
    }),
    DatabaseModule,
    AuthModule,
    RabbitMQModule.register('BILLING'),
    MongooseModule.forFeature([
      { name: OrderEntity.name, schema: OrderSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
