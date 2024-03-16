import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User is not authorized' });
      }

      const user = this.jwtService.verify(token);
      request.user = user;
      return user.roles.some((role) => requiredRoles.include(role.value));
    } catch (e) {
      throw new HttpException("No access", HttpStatus.FORBIDDEN);
    }
  }
}
