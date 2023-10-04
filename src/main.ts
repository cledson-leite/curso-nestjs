import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// import { LogInterceptor } from './log/log.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe());
	// app.useGlobalInterceptors(new LogInterceptor()); para uso em toda aaplicação

	await app.listen(3000);
}
bootstrap();
