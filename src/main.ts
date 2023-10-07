import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { LogInterceptor } from './log/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(3000);
}
bootstrap();
