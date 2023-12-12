import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto, ProductDto } from "./dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const products = await this.prisma.$queryRaw<
      any[]
    >`SELECT * FROM produto ORDER BY codigoid ASC`;
    return products;
  }

  async getById(codigo: number) {
    const products = await this.prisma.$queryRaw<
      any[]
    >`SELECT * FROM produto WHERE codigoid = ${codigo}`;

    if (!products || products.length === 0)
      throw new NotFoundException("Produto não encontrado");

    return products[0];
  }

  async create(dto: CreateProductDto) {
    const { titulo, valor, codigo } = dto;
    const estoque = dto.estoque ?? 0;
    const ativo = dto.ativo ?? true;

    try {
      await this.prisma
        .$queryRaw`INSERT INTO produto (codigo, titulo, valor, estoque, ativo) VALUES (${codigo}, ${titulo}, ${valor}, ${estoque}, ${ativo})`;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2010"
      ) {
        throw new BadRequestException(
          "Produto com este código de barras já cadastrado!",
        );
      }

      console.error(err);
      throw new InternalServerErrorException("Ocorreu um erro inesperado!");
    }
  }

  async update(codigo: number, dto: Partial<ProductDto>) {
    const product = await this.getById(codigo);

    const ativo = dto.ativo ?? product.ativo;
    const estoque = dto.estoque ?? product.estoque;
    const titulo = dto.titulo ?? product.titulo;
    const valor = dto.valor ?? product.valor;

    try {
      await this.prisma
        .$queryRaw`UPDATE produto SET titulo = ${titulo}, valor = ${valor}, estoque = ${estoque}, ativo = ${ativo} WHERE codigoid = ${codigo};`;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException("Ocorreu um erro inesperado!");
    }
  }
}
