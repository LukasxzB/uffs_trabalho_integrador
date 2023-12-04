import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  usuario: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
