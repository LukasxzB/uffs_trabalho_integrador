import { IsNumber } from "class-validator";

export class UserIdParamDto {
  @IsNumber()
  codigo: number;
}
