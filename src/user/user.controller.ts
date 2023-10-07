import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { LogInterceptor } from '../interception/log.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from '../storage/storage.service';
import { ApiTags } from '@nestjs/swagger';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from 'kafkajs';

@ApiTags('users')
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController implements OnModuleInit {
  private producer: Producer;
  constructor(
    private readonly service: UserService,
    private readonly storageService: StorageService,
    @Inject('KAFKA_SERVICE')
    private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.producer = await this.clientKafka.connect();
  }

  // @UseInterceptors(LogInterceptor) usado apenas no metodo
  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.service.create(data);
    await this.producer.send({
      topic: 'curso-nestjs',
      messages: [
        {
          key: `${Math.random() * 100}`,
          value: JSON.stringify(user),
        },
      ],
    });
    return user;
  }

  @Get()
  async list() {
    return await this.service.list();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.service.show(id);
  }
  @Put(':id')
  async update(
    @Body() body: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.service.update(id, body);
  }
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('avatar/:id')
  async upload(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    await this.storageService.upload(id, avatar);
    return { avatar: id };
  }
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}
