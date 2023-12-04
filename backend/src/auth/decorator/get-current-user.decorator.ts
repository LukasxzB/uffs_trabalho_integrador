import { createParamDecorator } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { Request } from "express";

export const GetCurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContextHost) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    return request.user;
  },
);
