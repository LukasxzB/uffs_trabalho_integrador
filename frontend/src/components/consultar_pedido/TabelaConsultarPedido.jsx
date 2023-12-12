// TabelaConsultarPedido.jsx
import React from "react";
import BarraPesquisa from "../pesquisa/BarraPesquisa";

const TabelaConsultarPedido = ({
  listaProdutos,
  onRemover,
  onSelectProduto,
}) => {
  const [textoFiltragem, setTextoFiltragem] = React.useState("");
  const [listaFiltrada, setListaFiltrada] = React.useState([]);

  React.useEffect(() => {
    if (listaProdutos !== null) {
      const filtrados = listaProdutos.filter((produto) => {
        const texto = textoFiltragem.toLowerCase().trim();
        return (
          produto.codigoproduto.toLowerCase().includes(texto) ||
          produto.nomep.toLowerCase().includes(texto)
        );
      });

      setListaFiltrada(filtrados);
    }
  }, [listaProdutos, textoFiltragem]);

  const handleRemover = (codigo) => {
    onRemover(codigo);
  };

  const handleSelecionarEdicao = (produto) => {
    onSelectProduto(produto);
  };

  return (
    <div>
      {listaProdutos !== null && (
        <>
          <BarraPesquisa
            textoPlaceholder={"Pesquise pelo código ou nome do produto"}
            setTextoFiltragem={setTextoFiltragem}
            textoFiltragem={textoFiltragem}
          />
          <table>
            <thead>
              <tr>
                <th>Código do produto</th>
                <th>Nome do produto</th>
                <th>Valor unitário</th>
                <th>Desconto un.</th>
                <th>Comprado por</th>
                <th>Vendido por</th>
                <th>Quantidade</th>
                <th>Quantidade entregue</th>
                <th>Quantidade devolvido</th>
                <th>Valor total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.map((produto) => (
                <tr key={produto.codigoproduto}>
                  <td>{produto.codigoproduto}</td>
                  <td>{produto.nomep}</td>
                  <td>R${(produto.valorun / 100).toFixed(2)}</td>
                  <td>R${(produto.desconto / 100).toFixed(2)}</td>
                  <td>{produto.nomec}</td>
                  <td>{produto.nomev}</td>
                  <td>{produto.quantidade}</td>
                  <td>{produto.entregue}</td>
                  <td>{produto.devolvido}</td>
                  <td>
                    R$
                    {(
                      ((produto.valorun - produto.desconto) *
                        produto.quantidade) /
                      100
                    ).toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="editar"
                      onClick={() => handleSelecionarEdicao(produto)}
                    >
                      Editar
                    </button>
                    <button
                      style={{ background: "darkred", color: "white" }}
                      onClick={() => handleRemover(produto.codigoitem)}
                    >
                      Remover
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

export default TabelaConsultarPedido;
