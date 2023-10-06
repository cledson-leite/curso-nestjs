import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  email: string = '';

  @IsStrongPassword({ minLength: 8 })
  password: string;
}
