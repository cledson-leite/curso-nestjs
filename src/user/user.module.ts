import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';
import { CheckIdMiddleware } from '../middleware/check-id/check-id.middleware';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  //modulos externos que serão usados neste modulo
  imports: [PrismaModule, StorageModule],
  //controles internos usados neste modulo
  controllers: [UserController],
  //serviços internos e classes internas que serão injetados no controles ou demais class
  providers: [UserService],
  //controles, serviços ou classes que serão expostos aoiporta este moduloem outros
  exports: [],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
