import React from "react";
import "./FormularioCadastroPedido.css";

function FormularioCadastroPedido({
  onAdicionarProduto,
  onCriarPedido,
  todosProdutos,
  todosClientes,
}) {
  const [produto, setProduto] = React.useState({
    codigo: "",
    titulo: "",
    valor: "",
    estoque: "",
    codigoid: "",
    desconto: "",
    quantidade: 0,
  });

  const [cliente, setCliente] = React.useState(null);

  const limparCampos = () => {
    setProduto({
      codigo: "",
      titulo: "",
      valor: "",
      estoque: "",
      codigoid: "",
      desconto: "",
      quantidade: 0,
    });
  };

  const handleSelectProduto = (codigoid) => {
    if (codigoid === "") {
      setProduto({
        codigo: "",
        titulo: "",
        valor: "",
        estoque: "",
        codigoid: "",
        desconto: "",
        quantidade: 0,
      });
      return;
    }

    const prod = todosProdutos.find(
      (produto) => produto.codigoid === parseInt(codigoid)
    );

    if (prod === null || prod === undefined) {
      alert("Produto não encontrado");
      return;
    }

    setProduto({
      codigo: prod.codigo,
      titulo: prod.titulo,
      valor: prod.valor,
      estoque: prod.estoque,
      codigoid: prod.codigoid,
      desconto: 0,
      quantidade: 0,
    });
  };

  const handleSelectCliente = (codigo) => {
    if (codigo === "") {
      setCliente(null);
      return;
    }

    const cliente = todosClientes.find(
      (cliente) => cliente.codigo === parseInt(codigo)
    );

    if (cliente === null || cliente === undefined) {
      alert("Selecione um cliente");
      return;
    }

    setCliente(cliente);
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

    if (produto.codigoid === "" || produto.codigoid === null) {
      alert("Selecione um produto");
      return;
    }

    const { codigoid, quantidade, desconto, codigo, titulo, valor } = produto;
    const novoProduto = {
      codigo,
      codigoid,
      quantidade,
      desconto,
      titulo,
      valor,
      final: Math.max(valor - desconto, 0) * quantidade,
    };
    onAdicionarProduto(novoProduto, limparCampos);
  };

  const handleCriarPedido = () => {
    if (cliente === null || cliente === undefined) {
      alert("Selecione um cliente");
      return;
    }

    onCriarPedido(cliente);
  };

  return (
    <form className="formulario-cadastro-cliente" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-group">
          <label>
            *Produto
            <select
              name="codigoid"
              onChange={(e) => handleSelectProduto(e.target.value)}
            >
              <option key={""} value={""}>
                Selecione o produto
              </option>
              {todosProdutos !== null &&
                todosProdutos !== undefined &&
                todosProdutos
                  .filter((prod) => prod.estoque > 0 && prod.ativo)
                  .map((p) => (
                    <option key={p.codigoid} value={p.codigoid}>
                      {p.titulo}
                    </option>
                  ))}
            </select>
          </label>
        </div>
        <div className="input-group">
          <label>
            *Quantidade
            <input
              type="text"
              name="quantidade"
              placeholder="1"
              value={produto.quantidade}
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
            Desconto unitário
            <input
              type="number"
              placeholder="R$ 0 (em centavos)"
              name="desconto"
              value={produto.desconto}
              onChange={handleChange}
              required
            />
          </label>
        </div>
      </div>
      <button
        type="button"
        className="botao-cadastrar-produto"
        onClick={handleSubmit}
      >
        Adicionar produto
      </button>
      <select
        name="codigocliente"
        onChange={(e) => handleSelectCliente(e.target.value)}
        style={{ marginTop: 10 }}
      >
        <option key={""} value={""}>
          Selecione o cliente
        </option>
        {todosClientes !== null &&
          todosClientes !== undefined &&
          todosClientes
            .filter((cli) => cli.ativo)
            .map((c) => (
              <option key={c.codigo} value={c.codigo}>
                {c.nome}
              </option>
            ))}
      </select>
      <button
        type="button"
        className="botao-cadastrar-produto"
        onClick={handleCriarPedido}
        style={{ marginTop: 10 }}
      >
        Criar pedido
      </button>
    </form>
  );
}

export default FormularioCadastroPedido;
