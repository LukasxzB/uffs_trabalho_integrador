import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CustomerDto } from "./dto/customer.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async getOneById(codigo: number) {
    const users = await this.prisma.$queryRaw<
      CustomerDto[]
    >`SELECT * FROM cliente WHERE codigo = ${codigo}`;

    if (users.length === 0) {
      throw new NotFoundException("Cliente não encontrado");
    }

    return users[0];
  }

  async getAll() {
    const users = await this.prisma.$queryRaw`SELECT * FROM cliente`;
    return users;
  }

  async create(dto: CustomerDto) {
    const { cpf, nascimento, nome, email, telefone } = dto;

    try {
      await this.prisma.$queryRaw<CustomerDto[]>`
      INSERT INTO cliente (cpf, nascimento, nome, email, telefone)
      VALUES ( ${cpf}, ${nascimento}, ${nome}, ${email}, ${telefone})
    `;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2010"
      ) {
        throw new BadRequestException("CPF já cadastrado");
      }

      console.error(error);
      throw new InternalServerErrorException("Ocorreu um erro inesperado!");
    }
  }

  async update(dto: Partial<CustomerDto>, codigo: number) {
    const user = await this.getOneById(codigo);

    const cpf = dto.cpf ?? user.cpf;
    const nascimento = dto.nascimento ?? user.nascimento;
    const nome = dto.nome ?? user.nome;
    const email = dto.email ?? user.email;
    const telefone = dto.telefone ?? user.telefone;

    try {
      await this.prisma.$queryRaw<CustomerDto[]>`
      UPDATE cliente
      SET cpf = ${cpf}, nascimento = ${nascimento}, nome = ${nome}, email = ${email}, telefone = ${telefone}
      WHERE codigo = ${codigo}
    `;
    } catch (error) {
      console.log(error);
    }
  }
}
