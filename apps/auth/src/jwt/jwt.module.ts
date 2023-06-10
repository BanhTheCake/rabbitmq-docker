import { Module } from '@nestjs/common';
import { JwtServices } from './jwt.services';
import { JwtModule as jwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [jwtModule.register({}), UserModule, PassportModule],
  providers: [JwtServices, JwtStrategy],
  exports: [JwtServices],
})
export class JwtModule {}
