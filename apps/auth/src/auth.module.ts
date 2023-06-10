import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtModule } from './jwt/jwt.module';
import { RabbitMQModule } from '@app/common/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env',
    }),
    DatabaseModule,
    UserModule,
    JwtModule,
    RabbitMQModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
