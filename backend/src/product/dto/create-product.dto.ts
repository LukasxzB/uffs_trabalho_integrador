import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(13)
  @MinLength(13)
  codigo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  titulo: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  valor: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  estoque: number;

  @IsOptional()
  @IsBoolean()
  ativo: boolean;
}
