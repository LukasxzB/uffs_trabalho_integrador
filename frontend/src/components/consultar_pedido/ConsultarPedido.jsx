import React from "react";
import Navbar from "../Navbar";
import { RequestSender } from "../../utils/request-sender";
import TabelaConsultarPedido from "./TabelaConsultarPedido";
import FormularioConsultarPedido from "./FormularioConsultarPedido";

function ConsultarPedido({ onLogout }) {
  const [produtos, setProdutos] = React.useState(null);
  const [editProduto, setEditProduto] = React.useState(null);

  const onClicarEmEditar = (produto) => {
    setEditProduto(produto);
  };

  const onRemover = (codigo) => {
    RequestSender().del(`/orders/item/${codigo}`, () => {
      setProdutos(produtos.filter((produto) => produto.codigoitem !== codigo));
    });
  };

  const onCancelarEdit = () => {
    setEditProduto(null);
  };

  const onEditar = (codigo, entregue, devolvido) => {
    RequestSender().put(
      `/orders/item/${codigo}`,
      { entregue, devolvido },
      () => {
        setEditProduto(null);

        setProdutos(
          produtos.map((produto) => {
            if (produto.codigoitem === codigo) {
              return { ...produto, entregue, devolvido };
            }

            return produto;
          })
        );
      }
    );
  };

  const onConsultarPedido = (codigo) => {
    RequestSender().get(`/orders/allitems/${codigo}`, (data) => {
      if (data.length === 0) {
        alert("Pedido não encontrado ou não há produtos cadastrados!");
        return;
      }

      console.log(data);

      setProdutos(data);
    });
  };

  return (
    <div>
      <Navbar onLogout={onLogout} />
      <FormularioConsultarPedido
        onConsultarPedido={onConsultarPedido}
        editProduto={editProduto}
        onCancelarEdit={onCancelarEdit}
        onEditarProduto={onEditar}
      />
      <TabelaConsultarPedido
        listaProdutos={produtos}
        onRemover={onRemover}
        onSelectProduto={onClicarEmEditar}
      />
    </div>
  );
}

export default ConsultarPedido;
