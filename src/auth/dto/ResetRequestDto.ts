import { IsJWT, IsStrongPassword } from 'class-validator';

export class ResetRequestDto {
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;

  @IsJWT()
  token: string;
}
