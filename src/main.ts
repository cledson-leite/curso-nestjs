import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
// import { LogInterceptor } from './log/log.interceptor';

async function bootstrap() {
  //yarn add @nestjs/microservices kafkajs
  //quando o uso é só mensageria
  // configuração do consumer
  // const app = await NestFactory.createMicroservice({
  //   transporte: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: ['http://localhost:9092'],
  //     },
  //     consumer: {
  //       groupId: `curso-nestjs-${Math.random() * 100}`,
  //     },
  //   },
  // });
  const app = await NestFactory.create(AppModule);
  //quando o uso é mista de rest e mensageria
  // configuração do consumer
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['//localhost:9092'],
      },
      consumer: {
        groupId: `curso-nestjs`,
      },
    },
  });
  //options é passada como um parametro em forma de objeto
  app.enableCors();
  //yarn add class-validation class-transform
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new LogInterceptor()); para uso em toda aaplicação

  // yarn add @nestjs/swagger swagger-ui-express
  // yarn add @nestjs/swagger fastify-swagger
  const config = new DocumentBuilder()
    .setTitle('Nest com swagger')
    .setDescription('Exemplo de uso do swagger no nest')
    .addServer('http://localhost:3000/v1')
    .addServer('http://localhost:3000/v2')
    .setVersion('0.0.0')
    .addTag('users')
    .addTag('auth')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  //quando usar connect microservice para iniciar os micros serviços
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
