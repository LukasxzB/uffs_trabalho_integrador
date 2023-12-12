import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto, UpdateOrderItem } from "./dto";
import { GetCurrentUser } from "src/auth/decorator/get-current-user.decorator";

@Controller("orders")
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get("/info")
  async getOrderInfo() {
    return await this.orderService.getOrderInfo();
  }

  @Get("/all")
  async getAll() {
    return await this.orderService.getAllOrders();
  }

  @Get("/allitems/:id")
  async getAllItems(@Param("id", new ParseIntPipe()) id: number) {
    return await this.orderService.getAllItemsFromOrder(id);
  }

  @Get("/all/notdelivered")
  async getNotDelivered() {
    return await this.orderService.getNotDelivered();
  }

  @Delete("/:id")
  async deleteOrder(@Param("id", new ParseIntPipe()) id: number) {
    return await this.orderService.deleteOrder(id);
  }

  @Post()
  async create(@Body() order: CreateOrderDto) {
    return await this.orderService.create(order);
  }

  @Put("/item/:id")
  async update(
    @Body() order: UpdateOrderItem,
    @Param("id", new ParseIntPipe()) id: number,
  ) {
    return await this.orderService.updateOrderItem(id, order);
  }

  @Delete('/item/:id')
  async deleteItem(@Param('id', new ParseIntPipe()) id: number) {
    return await this.orderService.deleteItem(id);
  }
}
