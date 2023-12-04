import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class UserDto {
  @IsNumber()
  codigo: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  usuario: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  nome: string;

  @IsBoolean()
  @IsOptional()
  administrador: boolean;

  @IsBoolean()
  @IsOptional()
  ativo: boolean;
}
