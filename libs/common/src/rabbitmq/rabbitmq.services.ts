import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MicroserviceOptions,
  RmqContext,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitMQServices {
  protected readonly logger = new Logger(RabbitMQServices.name);
  constructor(private configServices: ConfigService) {}

  getOptions(queue: string, noAck = false): MicroserviceOptions {
    const uri = this.configServices.get<string>('RABBIT_MQ_URI');
    const queueEnv = this.configServices.get<string>(
      `RABBIT_MQ_${queue}_QUEUE`,
    );

    if (!uri || !queueEnv) {
      throw new Error(
        `RABBIT_MQ_URI or RABBIT_MQ_${queue}_QUEUE are not provide`,
      );
    }
    return {
      transport: Transport.RMQ,
      options: {
        urls: [uri],
        queue: queueEnv,
        queueOptions: {
          durable: true,
        },
        noAck,
      },
    };
  }

  ackMessage(context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}
