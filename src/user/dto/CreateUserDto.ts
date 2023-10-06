import { IsString, IsEmail, IsStrongPassword, IsEnum } from 'class-validator';
import { Roles } from 'src/enum/roles';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(Roles)
  role: Roles;

  //para não ter as regras é so setar com zero
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;
}
