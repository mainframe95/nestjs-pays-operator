import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './decorators/roles.decorator';
import { Role } from './enum/role.enum';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    console.log('---RolesGuard')
    // const ctx = context.switchToHttp();
    // const request = ctx.getRequest<Request>();

    // console.log('users', request);
    const { user } = context.switchToHttp().getRequest();

    console.log('RolesGuard', user)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      console.log('here', requiredRoles)
      return true;
    }
    console.log('out if', requiredRoles)
    // return requiredRoles.some((role) => user.roles?.includes(role));
    return requiredRoles.some((role) => user.roles.toLowerCase() === role);
  }
}