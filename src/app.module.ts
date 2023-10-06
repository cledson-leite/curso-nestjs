import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { StorageModule } from './storage/storage.module';

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
    UserModule,
    PrismaModule,
    AuthModule,
    StorageModule,
  ],
  controllers: [AppController],
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
