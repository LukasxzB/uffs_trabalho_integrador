import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { UserDto } from "./dto/user.dto";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const { nome } = dto;
    const usuario = dto.usuario.toLowerCase();
    const administrador = dto.administrador ?? false;
    const ativo = dto.ativo ?? true;
    const senha = this.authService.hashPassword(dto.senha, null);

    try {
      await this.prisma
        .$queryRaw`INSERT INTO usuariointerno (nome, senha, usuario, administrador, ativo) VALUES (${nome}, ${senha}, ${usuario}, ${administrador}, ${ativo})`;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2010"
      ) {
        throw new BadRequestException("Este usuário já existe!");
      }

      throw new InternalServerErrorException("Ocorreu um erro inesperado!");
    }
  }

  async updateUser(dto: Partial<CreateUserDto>, codigo: number) {
    if (codigo === undefined || codigo === null) {
      throw new BadRequestException("O código do usuário deve ser informado!");
    }

    const users = await this.prisma.$queryRaw<
      UserDto[]
    >`SELECT * FROM usuariointerno WHERE codigo = ${codigo};`;

    if (!users || users.length === 0) {
      throw new BadRequestException("Usuário não encontrado!");
    }

    const user = users[0];
    const nome = dto.nome ?? user.nome;
    var senha = user.senha;

    if (dto.senha && dto.senha !== "") {
      senha = this.authService.hashPassword(dto.senha, null);
    }

    const usuario = dto.usuario?.toLowerCase() ?? user.usuario;
    const administrador = dto.administrador ?? user.administrador;
    const ativo = dto.ativo ?? user.ativo;

    try {
      await this.prisma
        .$queryRaw`UPDATE usuariointerno SET nome = ${nome}, senha = ${senha}, usuario = ${usuario}, administrador = ${administrador}, ativo = ${ativo} WHERE codigo = ${codigo};`;
    } catch (err) {
      throw new InternalServerErrorException("Ocorreu um erro inesperado!");
    }
  }
}
