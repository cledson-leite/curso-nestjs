import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/UserEmtity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    // private readonly prisma: PrismaService,
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create({ name, email, password, role }: CreateUserDto) {
    // return await this.prisma.user.create({
    //   data: { name, email, password },
    //   select: { id: true },
    // });
    const user = this.repository.create({ name, email, password, role });
    await this.repository.save(user);
    return user;
  }

  async list() {
    // return await this.prisma.user.findMany();
    return await this.repository.find();
  }

  async show(id: number) {
    // return await this.prisma.user.findUnique({ where: { id } });
    return await this.repository.findBy({ id });
  }

  async update(id: number, data: UpdateUserDto) {
    // return await this.prisma.user.update({ data, where: { id } });
    await this.repository.update(id, data);
    return { id };
  }

  async remove(id: number) {
    // return await this.prisma.user.delete({
    //   where: { id },
    //   select: { id: true },
    // });
    await this.repository.delete(id);
    return { id };
  }
}
