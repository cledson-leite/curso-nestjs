import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  //yarn add @nestjs/jwt
  imports: [
    JwtModule.register({ secret: `qDwXCy!~>hk#kQ1v]?+j)sMkcMh,VK):` }),
    PrismaModule,
    UserModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
