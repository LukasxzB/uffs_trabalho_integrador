import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderDto, UpdateOrderItem } from "./dto";

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAllOrders() {
    return await this.prisma.$queryRaw`with quantidade as (
      select sum(produtopedido.entregue)::integer as entregue, sum(produtopedido.quantidade)::integer as quantidadetotal,
      sum(produtopedido.devolvido)::integer as devolvido, pedido.codigo as codigo from produtopedido join pedido on
      pedido.codigo = produtopedido.codigo_pedido group by pedido.codigo), soma as
      (SELECT sum(produtopedido.quantidade * (produtopedido.valorun - produtopedido.desconto))::integer
      as valorfinal, pedido.codigo FROM produtopedido JOIN pedido on pedido.codigo = produtopedido.codigo_pedido 
      GROUP BY pedido.codigo) select quantidade.quantidadetotal, pedido.codigo, soma.valorfinal,
      cliente.nome as nomec, quantidade.entregue as entregue, quantidade.devolvido as devolvido, usuariointerno.nome as nomev,
      pedido.data_pedido from pedido join soma on soma.codigo = pedido.codigo join usuariointerno on
      usuariointerno.codigo = pedido.codigo_vendedor join cliente on cliente.codigo = pedido.codigo_cliente
      join quantidade on quantidade.codigo = pedido.codigo;`;
  }

  async getAllItemsFromOrder(id: number) {
    return await this.prisma.$queryRaw<any[]>`
      select produto.codigo as codigoproduto, pedido.codigo as codigopedido, cliente.nome as nomec,
      usuariointerno.nome as nomev, produtopedido.desconto as desconto,
      pedido.data_pedido as datapedido, produtopedido.entregue,
      produto.titulo as nomep, produtopedido.codigo as codigoitem,
      produtopedido.devolvido, produtopedido.valorun, produtopedido.quantidade
      from produtopedido join pedido on pedido.codigo = produtopedido.codigo_pedido
      join cliente on cliente.codigo = pedido.codigo_cliente
      join usuariointerno on usuariointerno.codigo = pedido.codigo_vendedor
      join produto on produto.codigoid = produtopedido.codigo_produto where pedido.codigo = ${id};`;
  }

  async deleteOrder(id: number) {
    return await this.prisma
      .$queryRaw`delete from pedido where codigo = ${id};`;
  }

  async getNotDelivered() {
    return await this.prisma.$queryRaw<any[]>`
      with produtos_nao_entregues as (select codigo_pedido, codigo_produto, quantidade, devolvido, entregue, valorun, desconto from produtopedido
      where produtopedido.entregue + produtopedido.devolvido < produtopedido.quantidade)
      select produtos_nao_entregues.codigo_pedido, pedido.data_pedido, cliente.nome as nomec, usuariointerno.nome as nomev,
      produto.codigo as codigo_produto, produtos_nao_entregues.devolvido,
      produto.titulo as nomep, produtos_nao_entregues.entregue, produtos_nao_entregues.quantidade,
      produtos_nao_entregues.valorun, produtos_nao_entregues.desconto
      from produtos_nao_entregues join pedido on pedido.codigo = produtos_nao_entregues.codigo_pedido
      join cliente on cliente.codigo = pedido.codigo_cliente
      join usuariointerno on usuariointerno.codigo = pedido.codigo_vendedor
      join produto on produto.codigoid = produtos_nao_entregues.codigo_produto;`;
  }

  async getOrderInfo() {
    const qnt30dias = await this.prisma.$queryRaw<
      any[]
    >`select count(*)::integer as quantidade from pedido where data_pedido > current_date - interval '30' day;`;
    const quantidade30dias = qnt30dias[0].quantidade;

    const qntCli = await this.prisma.$queryRaw<
      any[]
    >`select count(codigo)::integer as quantidade from cliente;`;
    const quantidadeClientes = qntCli[0].quantidade;

    const valor30 = await this.prisma.$queryRaw<
      any[]
    >`with pedidos as (select pedido.codigo from pedido where pedido.data_pedido > current_date - interval '30' day),
      pedidos30 as (select * from pedidos join produtopedido on produtopedido.codigo_pedido = pedidos.codigo),
      somas as (select sum((pedidos30.valorun - pedidos30.desconto) * pedidos30.quantidade)::integer as soma from pedidos30 group by pedidos30.codigo_pedido)
      select sum(somas.soma)::integer as total from somas;`;

    const valor30dias = valor30[0].total;

    return { quantidade30dias, quantidadeClientes, valor30dias };
  }

  async create(dto: CreateOrderDto) {
    const { codigo_cliente, codigo_vendedor, produtos } = dto;

    const pedido = await this.prisma.$queryRaw<any[]>`
      insert into pedido (codigo_cliente, codigo_vendedor) values (${codigo_cliente}, ${codigo_vendedor}) returning codigo;`;
    const codigoNovoPedido = pedido[0].codigo;

    for (const prod of produtos) {
      await this.prisma.$queryRaw<any[]>`
        insert into produtopedido (codigo_pedido, codigo_produto, quantidade, valorun, desconto) values
        (${codigoNovoPedido}, ${prod.codigo}, ${prod.quantidade}, ${prod.valor}, ${prod.desconto});`;
      await this.prisma.$queryRaw<any[]>`
        update produto set estoque = estoque - ${prod.quantidade} where codigoid = ${prod.codigo};`;
    }
  }

  async delete(codigo: number) {
    await this.prisma.$queryRaw<any[]>`
      delete from produtopedido where codigo_pedido = ${codigo};`;
    await this.prisma.$queryRaw<any[]>`
      delete from pedido where codigo = ${codigo};`;
  }

  async deleteItem(codigo: number) {
    await this.prisma.$queryRaw<any[]>`
      delete from produtopedido where codigo = ${codigo};`;
  }

  async updateOrderItem(codigo: number, dto: UpdateOrderItem) {
    const itens = await this.prisma.$queryRaw<
      any[]
    >`select * from produtopedido where codigo = ${codigo};`;

    if (itens.length === 0) throw new NotFoundException("Item não encontrado");
    const item = itens[0];

    const entregue = dto.entregue ?? item.entregue;
    const devolvido = dto.devolvido ?? item.devolvido;

    if (entregue + devolvido > item.quantidade) {
      throw new BadRequestException(
        "A quantidade de itens entregues e devolvidos não pode ser maior que a quantidade de itens vendidos",
      );
    }

    await this.prisma.$queryRaw<any[]>`
      update produtopedido set entregue = ${entregue}, devolvido = ${devolvido} where codigo = ${codigo};`;

    if (dto.devolvido && dto.devolvido > item.devolvido) {
      const diferenca = dto.devolvido - item.devolvido;
      await this.prisma.$queryRaw<any[]>`
        update produto set estoque = estoque + ${diferenca} where codigoid = ${item.codigo_produto};`;
    }
  }
}
