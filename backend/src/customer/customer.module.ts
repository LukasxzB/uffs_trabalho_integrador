import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [AuthModule],
})
export class CustomerModule {}
