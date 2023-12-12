import React from "react";
import BarraPesquisa from "../pesquisa/BarraPesquisa";

const TabelaPedidosNaoEntregues = ({ listaProdutos }) => {
  const [textoFiltragem, setTextoFiltragem] = React.useState("");
  const [listaFiltrada, setListaFiltrada] = React.useState([]);

  React.useEffect(() => {
    if (listaProdutos !== null && listaProdutos !== undefined) {
      const filtrados = listaProdutos.filter((produto) => {
        const texto = textoFiltragem.toLowerCase();
        return (
          produto.codigo_pedido.toString().toLowerCase().includes(texto) ||
          produto.codigo_produto.toString().toLowerCase().includes(texto) ||
          produto.nomep.toLowerCase().includes(texto) ||
          produto.nomec.toLowerCase().includes(texto) ||
          produto.nomev.toLowerCase().includes(texto)
        );
      });

      setListaFiltrada(filtrados);
    }
  }, [listaProdutos, textoFiltragem]);

  return (
    <div>
      <BarraPesquisa
        setTextoFiltragem={setTextoFiltragem}
        textoFiltragem={textoFiltragem}
        textoPlaceholder={
          "Pesquise pelo código do pedido, código do produto, nome do produto, nome do vendedor ou nome do comprador."
        }
      />
      {listaFiltrada !== null && (
        <table>
          <thead>
            <tr>
              <th>Código do pedido</th>
              <th>Código do produto</th>
              <th>Data do pedido</th>
              <th>Comprado por</th>
              <th>Vendido por</th>
              <th>Nome do produto</th>
              <th>Quantidade</th>
              <th>Quantidade entregue</th>
              <th>Quantidade devolvido</th>
              <th>Valor unitário</th>
              <th>Desconto</th>
              <th>Valor total</th>
            </tr>
          </thead>
          <tbody>
            {listaFiltrada.map((produto) => (
              <tr key={produto.codigo_produto}>
                <td>{produto.codigo_pedido}</td>
                <td>{produto.codigo_produto}</td>
                <td>{new Date(produto.data_pedido).toLocaleDateString()}</td>
                <td>{produto.nomec}</td>
                <td>{produto.nomev}</td>
                <td>{produto.nomep}</td>
                <td>{produto.quantidade}</td>
                <td>{produto.entregue}</td>
                <td>{produto.devolvido}</td>
                <td>R${(produto.valorun / 100).toFixed(2)}</td>
                <td>R${(produto.desconto / 100).toFixed(2)}</td>
                <td>
                  R$
                  {(
                    ((produto.valorun - produto.desconto) *
                      produto.quantidade) /
                    100
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TabelaPedidosNaoEntregues;
