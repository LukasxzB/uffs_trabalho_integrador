import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    const settings = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>("JWT_SECRET"),
      ignoreExpiration: false,
    };
    super(settings);
  }

  async validate(payload: { sub: number }) {
    const users = await this.prisma.$queryRaw<
      any[]
    >`SELECT * FROM usuariointerno WHERE codigo = ${payload.sub}`;

    if (users.length === 0) {
      return null;
    }

    const user = users[0];

    if (user.ativo === false) {
      return null;
    }

    const { usuario, codigo, administrador, nome } = user;

    return {
      usuario,
      codigo,
      administrador,
      nome,
    };
  }
}
