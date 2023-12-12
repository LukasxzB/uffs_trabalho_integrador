import { IsNumber, IsOptional } from "class-validator";

export class UpdateOrderItem {
  @IsOptional()
  @IsNumber()
  devolvido?: number;

  @IsOptional()
  @IsNumber()
  entregue?: number;
}
