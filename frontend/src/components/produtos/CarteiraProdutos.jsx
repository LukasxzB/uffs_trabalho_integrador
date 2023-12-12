// src/CarteiraProdutos.jsx
import React from "react";
import TabelaProdutos from "./TabelaProdutos";
import Navbar from "../Navbar";
import FormularioCadastroProduto from "./FormularioCadastroProduto";
import { RequestSender } from "../../utils/request-sender";

function CarteiraProdutos({ onLogout }) {
  const [produtos, setProdutos] = React.useState(null);
  const [editProduto, setEditProduto] = React.useState(null);

  React.useEffect(() => {
    RequestSender().get("/products", (res) => {
      setProdutos(res);
    });
  }, []);

  const handleCadastrarProduto = (novoProduto, limparCampos) => {
    RequestSender().post("/products", novoProduto, (res) => {
      setProdutos([...produtos, novoProduto]);
      limparCampos();
    });
  };

  const handleCancelarEdicao = () => {
    setEditProduto(null);
  };

  const handleAtualizarProduto = (codigo, novoProduto) => {
    RequestSender().put(`/products/${codigo}`, novoProduto, () => {
      setProdutos(
        produtos.map((p) => (p.codigoid === codigo ? novoProduto : p))
      );
      setEditProduto(null);
    });
  };

  const handleRemoverProduto = (codigo, produtoRemovido) => {
    RequestSender().put(`/products/${codigo}`, produtoRemovido, () => {
      setProdutos(
        produtos.map((p) => (p.codigoid === codigo ? produtoRemovido : p))
      );
    });
  };

  return (
    <div>
      <Navbar onLogout={onLogout} />
      <FormularioCadastroProduto
        onCadastrar={handleCadastrarProduto}
        editProduto={editProduto}
        onCancelarEdit={handleCancelarEdicao}
        onEditar={handleAtualizarProduto}
      />
      <TabelaProdutos
        listaProdutos={produtos}
        setEditarProduto={setEditProduto}
        onRemover={handleRemoverProduto}
      />
    </div>
  );
}

export default CarteiraProdutos;
