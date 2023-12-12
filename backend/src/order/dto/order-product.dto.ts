import { IsNumber } from "class-validator";

export class OrderProductDto {
  @IsNumber()
  codigo: number;

  @IsNumber()
  quantidade: number;

  @IsNumber()
  desconto: number;

  @IsNumber()
  valor: number;
}
