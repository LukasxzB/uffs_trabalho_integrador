import React from "react";
import TabelaProdutos from "./TabelaPedidos";
import Navbar from "../Navbar";
import { RequestSender } from "../../utils/request-sender";
import FormularioCadastroPedido from "./FormularioCadastroPedido";
import GetCurrentUserId from "../../utils/get-current-user-id";

function CarteiraPedidos({ onLogout }) {
  const [todosProdutos, setTodosProdutos] = React.useState(null);
  const [todosClientes, setTodosClientes] = React.useState(null);
  const [produtosInseridos, setProdutosInseridos] = React.useState([]);

  React.useEffect(() => {
    RequestSender().get("/products", (res) => {
      setTodosProdutos(res);
    });

    RequestSender().get("/customers", (res) => {
      setTodosClientes(res);
    });
  }, []);

  const handleAdicionarProduto = (novoProduto, limparCampos) => {
    for (const prod of produtosInseridos) {
      if (prod.codigoid === novoProduto.codigoid) {
        alert("Produto já inserido");
        return;
      }
    }

    setProdutosInseridos((prevProdutos) => {
      return [...prevProdutos, novoProduto];
    });
  };

  const handleRemoverProduto = (codigo) => {
    setProdutosInseridos((prevProdutos) => {
      return prevProdutos.filter((produto) => produto.codigoid !== codigo);
    });
  };

  const handleCriarPedido = (cliente) => {
    if (produtosInseridos.length === 0) {
      alert("Insira pelo menos um produto!");
      return;
    }

    const prods = [];

    for (const prod of produtosInseridos) {
      if (prod.quantidade === 0) {
        alert(`O produto ${prod.titulo} não pode ter quantidade 0!`);
        return;
      }

      if (prod.estoque < prod.quantidade) {
        alert(
          `O produto ${prod.titulo} não pode ter quantidade maior que o estoque!`
        );
        return;
      }

      prods.push({
        codigo: prod.codigoid,
        quantidade: parseInt(prod.quantidade),
        desconto: prod.desconto,
        valor: prod.valor,
      });
    }

    const body = {
      codigo_cliente: cliente.codigo,
      produtos: prods,
      codigo_vendedor: parseInt(GetCurrentUserId()),
    };

    RequestSender().post("/orders", body, (data) => {
      console.log(data);
    });
  };

  return (
    <div>
      <Navbar onLogout={onLogout} />
      <FormularioCadastroPedido
        todosProdutos={todosProdutos}
        todosClientes={todosClientes}
        onAdicionarProduto={handleAdicionarProduto}
        onCriarPedido={handleCriarPedido}
      />
      <TabelaProdutos
        produtosInseridos={produtosInseridos}
        onRemover={handleRemoverProduto}
      />
    </div>
  );
}

export default CarteiraPedidos;
