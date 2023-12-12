import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { CustomerService } from "./customer.service";
import { CustomerDto } from "./dto";

@Controller("customers")
@UseGuards(JwtGuard)
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  async create(@Body() dto: CustomerDto) {
    await this.customerService.create(dto);
  }

  @Put("/:cpf")
  async update(@Body() dto: Partial<CustomerDto>, @Param("cpf") cpf: string) {
    await this.customerService.update(dto, cpf);
  }

  @Get()
  async getAll() {
    return await this.customerService.getAll();
  }

  @Get("/:cpf")
  get(@Param("cpf") cpf: string) {
    return this.customerService.getOneById(cpf);
  }
}
