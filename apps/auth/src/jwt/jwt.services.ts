import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../user/user.schema';

@Injectable()
export class JwtServices {
  constructor(private jwt: JwtService, private configServices: ConfigService) {}

  async generateToken(userId: UserEntity['_id']) {
    return await this.jwt.signAsync(
      { userId },
      {
        expiresIn: this.configServices.get<number>('EXPIRES_IN'),
        secret: this.configServices.get<string>('SECRET_TOKEN'),
      },
    );
  }
}
