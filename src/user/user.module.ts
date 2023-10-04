import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';

@Module({
	//modulos externos que serão usados neste modulo
	imports: [PrismaModule],
	//controles internos usados neste modulo
	controllers: [UserController],
	//serviços internos e classes internas que serão injetados no controles ou demais class
	providers: [UserService],
	//controles, serviços ou classes que serão expostos aoiporta este moduloem outros
	exports: []
})
export class UserModule {}
