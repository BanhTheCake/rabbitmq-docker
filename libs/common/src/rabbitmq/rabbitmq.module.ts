import { Module, DynamicModule, Logger } from '@nestjs/common';
import { RabbitMQServices } from './rabbitmq.services';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [RabbitMQServices],
  exports: [RabbitMQServices],
})
export class RabbitMQModule {
  static register(name: string): DynamicModule {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: name,
            useFactory: (configService: ConfigService) => {
              const uri = configService.get<string>('RABBIT_MQ_URI');
              const queue = configService.get<string>(
                `RABBIT_MQ_${name}_QUEUE`,
              );
              if (!uri || !queue) {
                throw new Error(
                  `RABBIT_MQ_URI or RABBIT_MQ_${name}_QUEUE are not provide`,
                );
              }
              return {
                transport: Transport.RMQ,
                options: {
                  urls: [uri],
                  queue,
                  queueOptions: {
                    durable: true,
                  },
                },
              };
            },
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
