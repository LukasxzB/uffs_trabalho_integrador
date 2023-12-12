// CarteiraProdutos.jsx
import React from "react";
import BarraPesquisa from "../pesquisa/BarraPesquisa";

const CarteiraProdutos = ({ listaProdutos, setEditarProduto, onRemover }) => {
  const [textoFiltragem, setTextoFiltragem] = React.useState("");
  const [listaFiltrada, setListaFiltrada] = React.useState([]);

  React.useEffect(() => {
    if (listaProdutos !== null && listaProdutos !== undefined) {
      const filtrados = listaProdutos.filter((cliente) => {
        const texto = textoFiltragem.toLowerCase().trim();
        return (
          cliente.codigo.toLowerCase().includes(texto) ||
          cliente.titulo.toLowerCase().includes(texto)
        );
      });

      setListaFiltrada(filtrados);
    }
  }, [listaProdutos, textoFiltragem]);

  const handleRemover = (produto) => {
    produto.ativo = !produto.ativo;
    onRemover(produto.codigoid, produto);
  };

  return (
    <div>
      {listaFiltrada === null ? (
        <h1>Carregando lista de produtos...</h1>
      ) : (
        <>
          <BarraPesquisa
            setTextoFiltragem={setTextoFiltragem}
            textoFiltragem={textoFiltragem}
            textoPlaceholder={"Pesquise pelo código ou nome do produto"}
          />
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome do produto</th>
                <th>Valor unitário</th>
                <th>Quantidade em estoque</th>
                <th>Produto ativo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.map((produto) => (
                <tr key={produto.codigo}>
                  <td>{produto.codigo}</td>
                  <td>{produto.titulo}</td>
                  <td>R${(produto.valor / 100).toFixed(2)}</td>
                  <td>{produto.estoque}</td>
                  <td>{produto.ativo ? "Sim" : "Não"}</td>
                  <td>
                    <button
                      style={{ background: "darkgreen", color: "white" }}
                      onClick={() => setEditarProduto(produto)}
                    >
                      Editar
                    </button>
                    <button
                      style={{ background: "darkred", color: "white" }}
                      onClick={() => handleRemover(produto)}
                    >
                      {produto.ativo ? "Desativar" : "Ativar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CarteiraProdutos;
