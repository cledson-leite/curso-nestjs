import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { LoginRequestDto } from './dto/LoginRequestDto';
import { SignUpRequestDto } from './dto/SignUpRequestDto';
import { ForgetRequestDto } from './dto/ForgetRequestDto';
import { ResetRequestDto } from './dto/ResetRequestDto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guard/auth/auth.guard';
import { User } from '../decorator/user/user.decorator';
import { User as UserDto } from '@prisma/client';
import { Role } from 'src/decorator/role/role.decorator';
import { Roles } from 'src/enum/roles';
import { RoleGuard } from 'src/guard/role/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: LoginRequestDto) {
    return await this.service.login({ email, password });
  }
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

  @Role(Roles.USER)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('me')
  async getMe(@User('id') user: UserDto) {
    return { user };
  }
}
