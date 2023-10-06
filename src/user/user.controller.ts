import {
  Body,
  Controller,
  Delete,
  Get,
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

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly storageService: StorageService,
  ) {}

  // @UseInterceptors(LogInterceptor) usado apenas no metodo
  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.service.create(data);
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
