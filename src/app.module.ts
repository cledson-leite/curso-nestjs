import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { StorageModule } from './storage/storage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/UserEmtity';
import { ConfigModule } from '@nestjs/config';
import { KafkaController } from './user/kafka.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    //yarn add @nestjs/throttler
    ThrottlerModule.forRoot([
      {
        // ignora requesições de um determinado agente
        // recebe um array de regex com o nome do boot
        // ignoreUserAgents:
        //tempo que limitará a quantidade passada no limit
        ttl: 60000,
        limit: 100000,
      },
    ]),
    //yarn add @nestjs/config
    ConfigModule.forRoot({
      envFilePath: process.env.ENV === 'test' ? '.env.test' : '.env',
    }),
    //yarn add @nestjs/cache-manager cache-manager cache-manager-redis-yet
    //yarn add -D @types/cache-manager
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    StorageModule,
    //yarn add typeorm pg(banco usado) @nestjs/typeorm
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [UserEntity],
      migrations: [],
    }),
  ],
  controllers: [AppController, KafkaController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      // para usoem toda aplicaçao ou use com UseGuards
      //no handle para cada requisição ou no controller para todas a requisiçoes
      useClass: ThrottlerGuard,
    },
  ],
  exports: [AppService],
})
export class AppModule {}
