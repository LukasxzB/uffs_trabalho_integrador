import { Transform } from "class-transformer";
import {
  IsDate,
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

  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  nascimento: number;

  @IsOptional()
  @IsEmail()
  @MaxLength(128)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  telefone?: string;
}
