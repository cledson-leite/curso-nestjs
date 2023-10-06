import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { LogInterceptor } from '../interception/log.interceptor';

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

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
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}
