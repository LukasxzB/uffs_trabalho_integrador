import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";

export class ProductDto {
  @IsNumber()
  codigo: number;

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
