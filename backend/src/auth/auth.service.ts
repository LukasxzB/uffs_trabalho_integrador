import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { scryptSync, randomBytes } from "node:crypto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signin(dto: AuthDto) {
    const senha = dto.senha;
    const usuario = dto.usuario.toLowerCase();

    const users = await this.prisma.$queryRaw<
      any[]
    >`SELECT * FROM usuariointerno
      WHERE usuario = ${usuario}`;

    if (users.length === 0) {
      throw new NotFoundException("Este usuário não existe!");
    }

    const user = users[0];
    if (user.ativo === false) {
      throw new ForbiddenException("Este usuário está inativo!");
    }

    if (!this.verifyHash(senha, user.senha)) {
      throw new ForbiddenException("Senha incorreta!");
    }

    const token = this.signToken(user.codigo, user.administrador);
    return { token, admin: user.administrador };
  }

  verifyHash(senha: string, hash: string): boolean {
    const [salt, hashVerify] = hash.split(".");
    const [oldSalt, newHash] = this.hashPassword(senha, salt).split(".");
    return hashVerify === newHash;
  }

  hashPassword(senha: string, salt: string | null): string {
    const newSalt = salt ?? randomBytes(32).toString("hex");
    const hash = scryptSync(senha, newSalt, 32).toString("hex");
    return `${newSalt}.${hash}`;
  }

  signToken(codigoUsuario: number, administrador: boolean) {
    const payload = {
      sub: codigoUsuario,
      administrador,
    };

    const secret = this.config.get<string>("JWT_SECRET");

    return this.jwt.sign(payload, { expiresIn: "1h", secret });
  }
}
