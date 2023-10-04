import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async create({ name, email, password }: CreateUserDto) {
		return await this.prisma.user.create({
			data: { name, email, password },
			select: { id: true }
		});
	}

	async list() {
		return await this.prisma.user.findMany();
	}

	async show(id: number) {
		return await this.prisma.user.findUnique({ where: { id } });
	}

	async update(id: number, data: UpdateUserDto) {
		return await this.prisma.user.update({ data, where: { id } });
	}

	async remove(id: number) {
		return await this.prisma.user.delete({
			where: { id },
			select: { id: true }
		});
	}
}
