import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/shared/public';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly reflector: Reflector; 

  constructor(private readonly authService: AuthService) {
    this.reflector = new Reflector();
  }

  private isPublic(context: ExecutionContext): boolean {
    return (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]));
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if(this.isPublic(context)) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token: string  = request.headers.authorization
    if(!token) {
      throw new UnauthorizedException('Missing authorization header');
    }
    if (!this.authService.isAuthorised(token)){
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
}
