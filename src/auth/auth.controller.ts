import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { LoginRequestDto } from './dto/LoginRequestDto';
import { SignUpRequestDto } from './dto/SignUpRequestDto';
import { ForgetRequestDto } from './dto/ForgetRequestDto';
import { ResetRequestDto } from './dto/ResetRequestDto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guard/auth/auth.guard';
import { User } from '../decorator/user/user.decorator';
import { User as UserDto } from '@prisma/client';
import { Role } from '../decorator/role/role.decorator';
import { Roles } from '../enum/roles';
import { RoleGuard } from '../guard/role/role.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: LoginRequestDto) {
    return await this.service.login({ email, password });
  }
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: SignUpRequestDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Post('signUp')
  async signUp(@Body() body: SignUpRequestDto) {
    return await this.service.signup(body);
  }
  @Post('forget')
  async forget(@Body() { email }: ForgetRequestDto) {
    return await this.service.forget(email);
  }
  @Post('reset')
  async reset(@Body() { password, token }: ResetRequestDto) {
    return await this.service.reset(password, token);
  }
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiBearerAuth()
  @Role(Roles.USER)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('me')
  async getMe(@User('id') user: UserDto) {
    return { user };
  }
}
