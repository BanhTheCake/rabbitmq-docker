import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    ConfigService: ConfigService,
    private UserRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: any) => {
          return req?.authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: ConfigService.get<string>('SECRET_TOKEN'),
    });
  }

  async validate(payload: { userId: string }) {
    let user: UserEntity;
    try {
      user = await this.UserRepository.findById(payload.userId);
    } catch (error) {}
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
