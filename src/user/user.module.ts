import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
// import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';
import { CheckIdMiddleware } from '../middleware/check-id/check-id.middleware';
import { StorageModule } from 'src/storage/storage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/UserEmtity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaController } from './kafka.controller';

@Module({
  //modulos externos que serão usados neste modulo
  imports: [
    // PrismaModule,
    StorageModule,
    TypeOrmModule.forFeature([UserEntity]),
    //configuração para producer
    //deve ser feita em cada modulo que produz mensagem
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['//localhost:9092'],
          },
        },
      },
    ]),
  ],
  //controles internos usados neste modulo
  controllers: [UserController, KafkaController],
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
