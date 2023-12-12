import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from "class-validator";

export class CustomerDto {
  @IsString()
  @MaxLength(128)
  nome: string;

  @IsString()
  @Length(11, 11)
  cpf: string;

  @IsString()
  @MaxLength(128)
  nascimento: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(128)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  telefone?: string;

  @IsString()
  @MaxLength(128)
  endereco: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
