import React from "react";
import "./FormularioConsultarPedido.css";

function FormularioConsultarPedido({
  onConsultarPedido,
  editProduto,
  onCancelarEdit,
  onEditarProduto,
}) {
  const [codigo, setCodigo] = React.useState("");
  const [entregue, setEntregue] = React.useState(0);
  const [devolvido, setDevolvido] = React.useState(0);

  React.useEffect(() => {
    if (editProduto !== null) {
      setEntregue(editProduto.entregue);
      setDevolvido(editProduto.devolvido);
    }
  }, [editProduto]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (codigo === "" || codigo == null) {
      alert("Insira um código!");
      return;
    }

    onConsultarPedido(codigo);
  };

  const handleEditar = (e) => {
    e.preventDefault();

    if (entregue < 0 || devolvido < 0) {
      alert("Insira uma quantidade válida!");
      return;
    }

    if (entregue > editProduto.quantidade) {
      alert("A quantidade entregue não pode ser maior que a quantidade total!");
      return;
    }

    if (entregue + devolvido > editProduto.quantidade) {
      console.log("entregue", entregue);
      console.log("devolvido", devolvido);
      console.log("quantidade", editProduto.quantidade);
      alert(
        "A quantidade entregue e devolvida não pode ser maior que a quantidade total!"
      );
      return;
    }

    onEditarProduto(editProduto.codigoitem, entregue, devolvido);
  };

  const handleCancelar = (e) => {
    e.preventDefault();

    setEntregue(0);
    setDevolvido(0);
    onCancelarEdit();
  };

  return (
    <>
      {editProduto === null ? (
        <form className="formulario-cadastro-cliente" onSubmit={handleSubmit}>
          <label>
            *Código do pedido
            <input
              type="number"
              name="codigo"
              placeholder="00000000000"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="botao-cadastrar-produto"
            onClick={handleSubmit}
          >
            Consultar pedido
          </button>
        </form>
      ) : (
        <form className="formulario-cadastro-cliente" onSubmit={handleEditar}>
          <div className="form-row">
            <div className="input-group">
              <label>
                Quantidade de itens entregues
                <input
                  type="number"
                  name="entregue"
                  placeholder="1"
                  value={entregue}
                  onChange={(e) => setEntregue(parseInt(e.target.value))}
                  required
                />
              </label>
            </div>
            <div className="input-group">
              <label>
                Quantidade de itens devolvidos
                <input
                  type="number"
                  name="devolvido"
                  placeholder="0"
                  value={devolvido}
                  onChange={(e) => setDevolvido(parseInt(e.target.value))}
                  required
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="botao-cadastrar-produto"
            onClick={handleEditar}
          >
            Atualizar item
          </button>
          <button
            type="button"
            className="botao-cadastrar-produto"
            onClick={handleCancelar}
            style={{ background: "darkred", color: "white", marginTop: 10 }}
          >
            Cancelar
          </button>
        </form>
      )}
    </>
  );
}

export default FormularioConsultarPedido;
