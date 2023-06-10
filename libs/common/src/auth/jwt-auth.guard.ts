import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { Observable, catchError, tap } from 'rxjs';

@Injectable()
export class JwtGuardCommon implements CanActivate {
  constructor(@Inject('AUTH') private client: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(context);
    return this.client.send({ cmd: 'validate_user' }, { authentication }).pipe(
      tap((user: any) => {
        this.addUser(user, context);
      }),
      catchError(() => {
        throw new UnauthorizedException();
      }),
    );
  }

  private getAuthentication(context: ExecutionContext) {
    let authentication: string;
    if (context.getType() === 'http') {
      const request: Request = context.switchToHttp().getRequest();
      authentication = request.cookies?.authentication;
    } else if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData()?.authentication;
    }
    if (!authentication) {
      throw new UnauthorizedException();
    }
    return authentication;
  }

  private addUser(user: any, context: ExecutionContext) {
    if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    } else if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    }
  }
}
