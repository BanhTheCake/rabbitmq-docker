import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, RabbitMQModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/billing/.env',
    }),
    RabbitMQModule,
    AuthModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
