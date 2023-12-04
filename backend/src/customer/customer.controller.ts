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

  @Put("/:codigo")
  async update(
    @Body() dto: Partial<CustomerDto>,
    @Param("codigo", new ParseIntPipe()) codigo: number,
  ) {
    await this.customerService.update(dto, codigo);
  }

  @Get()
  async getAll() {
    return await this.customerService.getAll();
  }

  @Get("/:codigo")
  get(@Param("codigo", new ParseIntPipe()) codigo: number) {
    return this.customerService.getOneById(codigo);
  }
}
