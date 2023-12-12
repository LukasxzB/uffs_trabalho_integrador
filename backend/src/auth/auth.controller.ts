import { Body, Controller, Post, Req, Res, Session } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signin")
  async signin(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, admin } = await this.authService.signin(dto);
    res.setHeader("Authorization", `Bearer ${token}`);
    return { token, admin };
  }
}
