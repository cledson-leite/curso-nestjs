import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/decorator/role/role.decorator';
import { Roles } from 'src/enum/roles';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Roles[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required) return true;
    const { user } = context.switchToHttp().getRequest();
    const filtreded = required.filter((role) => role === user.role);
    return filtreded.length > 0;
  }
}
