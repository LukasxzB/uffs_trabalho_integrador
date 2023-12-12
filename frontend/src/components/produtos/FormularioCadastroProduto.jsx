// src/components/FormularioCadastroProduto.jsx
import React from "react";
import "./FormularioCadastroProduto.css";

function FormularioCadastroProduto({
  onCadastrar,
  onEditar,
  editProduto,
  onCancelarEdit,
}) {
  const [produto, setProduto] = React.useState({
    codigo: "",
    titulo: "",
    valor: "",
    estoque: "",
    codigoid: "",
    ativo: true,
  });

  React.useEffect(() => {
    setProduto({
      codigo: editProduto?.codigo ?? "",
      titulo: editProduto?.titulo ?? "",
      valor: editProduto?.valor ?? "",
      estoque: editProduto?.estoque ?? "",
      codigoid: editProduto?.codigoid ?? "",
      ativo: editProduto?.ativo ?? true,
    });
  }, [editProduto]);

  const limparCampos = () => {
    setProduto({
      codigo: "",
      titulo: "",
      valor: "",
      estoque: "",
      codigoid: "",
      ativo: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prevProduto) => ({
      ...prevProduto,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { codigo, titulo, valor, estoque, codigoid, ativo } = produto;
    const novoProduto = {
      titulo,
      ativo,
      codigo: codigo.toString(),
      valor: valor === "" ? -1 : parseInt(valor),
      estoque: estoque === "" ? 0 : parseInt(estoque),
    };

    if (editProduto !== null) {
      onEditar(codigoid, novoProduto);
      return;
    }

    onCadastrar(novoProduto, limparCampos);
  };

  const handleCancelar = () => {
    onCancelarEdit();
    limparCampos();
  };

  return (
    <form className="formulario-cadastro-cliente" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-group">
          <label>
            *Código de barras
            <input
              type="number"
              name="codigo"
              placeholder="00000000000"
              value={produto.codigo}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            *Nome do produto
            <input
              type="text"
              name="titulo"
              placeholder="Fertilizante"
              value={produto.titulo}
              onChange={handleChange}
              required
            />
          </label>
        </div>
      </div>
      <div className="form-row">
        <div className="input-group">
          <label>
            *Valor unitário
            <input
              type="number"
              name="valor"
              placeholder="R$ 0 (em centavos)"
              value={produto.valor}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Quantidade em estoque
            <input
              type="number"
              placeholder="0"
              name="estoque"
              value={produto.estoque}
              onChange={handleChange}
              required
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="botao-cadastrar-produto"
        onClick={handleSubmit}
      >
        {editProduto !== null ? "Editar produto" : "Cadastrar produto"}
      </button>
      {editProduto !== null && (
        <button
          type="reset"
          onClick={handleCancelar}
          className="botao-cancelar"
          style={{ marginTop: 5, backgroundColor: "darkred" }}
        >
          Cancelar edição
        </button>
      )}
    </form>
  );
}

export default FormularioCadastroProduto;
