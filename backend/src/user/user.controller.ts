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
import { AdminGuard } from "src/auth/guard/admin.guard";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto";
import { UserService } from "./user.service";

@Controller("users")
@UseGuards(JwtGuard)
export class UserController {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  async getAll() {
    const users = await this.prisma.$queryRaw<
      any[]
    >`SELECT * FROM usuariointerno`;

    if (!users || users.length === 0) return [];
    users.map((user) => delete user.senha);
    return users;
  }

  @Post()
  @UseGuards(AdminGuard)
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put("/:codigo")
  @UseGuards(AdminGuard)
  async updateUser(
    @Body() dto: Partial<CreateUserDto>,
    @Param("codigo", new ParseIntPipe()) codigo: number,
  ) {
    return this.userService.updateUser(dto, codigo);
  }
}
