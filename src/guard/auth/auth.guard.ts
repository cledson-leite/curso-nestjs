import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly service: AuthService,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = await this.service.verify(
        (authorization ?? ' ').split(' ')[1],
      );
      request.user = await this.prisma.user.findUnique({
        where: { id: Number(data.sub) },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
