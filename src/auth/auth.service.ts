import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { SignUpRequestDto } from './dto/SignUpRequestDto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { LoginRequestDto } from './dto/LoginRequestDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  create(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'auth',
          audience: 'user',
        },
      ),
    };
  }

  verify(token: string) {
    try {
      return this.jwtService.verify(token, {
        issuer: 'auth',
        audience: 'user',
      });
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async signup(data: SignUpRequestDto) {
    const salt = await genSalt();
    data.password = await hash(data.password, salt);
    try {
      const user = await this.prisma.user.create({
        data,
      });
      return this.create(user);
    } catch (error) {
      // throw new BadRequestException('Email e/ou Senha invalidos');
      throw new BadRequestException(error);
    }
  }
  async login({ email, password }: LoginRequestDto) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new UnauthorizedException('Email e/ou Senha invalidos');

    const isValid = await compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Email e/ou Senha invalidos');

    return this.create(user);
  }
  async forget(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Email e/ou Senha invalidos');

    //TODO envio de email
  }

  async reset(password: string, token: string) {
    //TODO verificar token
    token;
    const id = 3;
    const salt = await genSalt();
    const hashed = await hash(password, salt);
    const user = await this.prisma.user.update({
      where: { id },
      data: { password: hashed },
    });
    return this.create(user);
  }
}
