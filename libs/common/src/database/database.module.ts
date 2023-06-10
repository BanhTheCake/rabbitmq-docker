import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configServices: ConfigService): MongooseModuleOptions => {
        const mongoUri = configServices.get<string>('MONGO_URI');
        if (!mongoUri) {
          throw new Error('MONGO_URI are not provide in .env');
        }
        return {
          uri: mongoUri,
          dbName: 'paymentDB',
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
