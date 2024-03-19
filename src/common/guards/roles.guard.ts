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
import { ROLES_KEY } from 'src/common/decorators/roles-auth.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
      if (!authHeader) {
        throw new UnauthorizedException({
          message: 'Authorization header is missing',
        });
      }
      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Invalid authorization header',
        });
      }
      const user = await this.jwtService.verifyAsync(token);
      if (!user || !user.roles) {
        throw new UnauthorizedException({
          message: 'Invalid user or roles are missing',
        });
      }
      request.user = user;
      return user.roles.some((role) => requiredRoles.includes(role));
    } catch (e) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN);
    }
  }
}
