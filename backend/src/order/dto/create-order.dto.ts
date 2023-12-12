import { IsArray, IsNumber, ValidateNested } from "class-validator";
import { OrderProductDto } from "./index";
import { Type } from "class-transformer";

export class CreateOrderDto {
  @IsNumber()
  codigo_cliente: number;

  @IsNumber()
  codigo_vendedor: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  produtos: OrderProductDto[];
}
