import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { Roles } from '../../enum/roles';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequestDto {
  @ApiProperty({
    example: 'Cledson Leite',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email será usado para login e será unico',
    example: 'csbetsonline@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Função que será usada para geri o acesso',
    enum: ['ADM', 'USER'],
    example: 'ADM',
  })
  @IsEnum(Roles)
  role: Roles;

  @ApiProperty({
    description: 'Senha forte comnominimo 8 caracteres',
    example: 'U-x3]6qJ',
  })
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}
