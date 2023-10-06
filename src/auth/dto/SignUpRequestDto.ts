import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { Roles } from 'src/enum/roles';

export class SignUpRequestDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(Roles)
  role: Roles;

  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}
