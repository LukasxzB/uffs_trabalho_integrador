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

  async getOneById(cpf: string) {
    const users = await this.prisma.$queryRaw<
      CustomerDto[]
    >`SELECT * FROM cliente WHERE cpf = ${cpf}`;

    if (users.length === 0) {
      throw new NotFoundException("Cliente não encontrado");
    }

    return users[0];
  }

  async getAll() {
    const users = await this.prisma
      .$queryRaw`SELECT * FROM cliente ORDER BY codigo ASC`;
    return users;
  }

  async create(dto: CustomerDto) {
    const { cpf, nascimento, nome, email, telefone, endereco } = dto;

    try {
      await this.prisma.$queryRaw<CustomerDto[]>`
      INSERT INTO cliente (cpf, nascimento, nome, email, telefone, endereco)
      VALUES (${cpf}, ${nascimento}, ${nome}, ${email}, ${telefone}, ${endereco})
    `;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2010"
      ) {
        console.log(error);
        throw new BadRequestException("CPF já cadastrado");
      }

      console.error(error);
      throw new InternalServerErrorException("Ocorreu um erro inesperado!");
    }
  }

  async update(dto: Partial<CustomerDto>, cpf: string) {
    const user = await this.getOneById(cpf);

    const novoCpf = dto.cpf ?? user.cpf;
    const nascimento = dto.nascimento ?? user.nascimento;
    const nome = dto.nome ?? user.nome;
    const email = dto.email ?? user.email;
    const telefone = dto.telefone ?? user.telefone;
    const endereco = dto.endereco ?? user.endereco;
    const ativo = dto.ativo ?? user.ativo;

    try {
      await this.prisma.$queryRaw<CustomerDto[]>`
      UPDATE cliente
      SET cpf = ${novoCpf}, nascimento = ${nascimento}, nome = ${nome}, email = ${email}, telefone = ${telefone},
      endereco = ${endereco} , ativo = ${ativo}
      WHERE cpf = ${cpf}
    `;
    } catch (error) {
      console.log(error);
    }
  }
}
