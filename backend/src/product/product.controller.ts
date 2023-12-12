import { Body, Controller, Get, ParseIntPipe } from "@nestjs/common";
import { Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { CreateProductDto, ProductDto } from "./dto";
import { ProductService } from "./product.service";

@Controller("products")
@UseGuards(JwtGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAll() {
    return await this.productService.getAll();
  }

  @Get("/:codigo")
  async getById(@Param("codigo", new ParseIntPipe()) codigo: number) {
    return await this.productService.getById(codigo);
  }

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @Put("/:codigo")
  async update(
    @Body() dto: Partial<ProductDto>,
    @Param("codigo", new ParseIntPipe()) id: number,
  ) {
    return await this.productService.update(id, dto);
  }
}
