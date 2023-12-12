// src/TabelaVendas.jsx
import React from "react";
import "./TabelaVendas.css";
import BarraPesquisa from "../pesquisa/BarraPesquisa";

const TabelaVendas = ({ pedidos, onDeletar }) => {
  const [textoFiltragem, setTextoFiltragem] = React.useState("");
  const [listaFiltrada, setListaFiltrada] = React.useState([]);

  React.useEffect(() => {
    if (pedidos !== null && pedidos !== undefined) {
      const filtrados = pedidos.filter((pedido) => {
        const texto = textoFiltragem.toLowerCase().trim();
        return (
          pedido.codigo.toString().toLowerCase().includes(texto) ||
          pedido.nomec.toLowerCase().includes(texto) ||
          pedido.nomev.toLowerCase().includes(texto)
        );
      });

      setListaFiltrada(filtrados);
    }
  }, [pedidos, textoFiltragem]);

  const handleRemover = (codigo) => {
    onDeletar(codigo);
  };

  return (
    <div className="tabela-container">
      <BarraPesquisa
        setTextoFiltragem={setTextoFiltragem}
        textoFiltragem={textoFiltragem}
        textoPlaceholder={
          "Pesquise pelo código do pedido, nome do comprador ou nome do vendedor."
        }
      />
      <table>
        <thead>
          <tr>
            <th>Código do pedido</th>
            <th>Comprado por</th>
            <th>Vendidor por</th>
            <th>Data da compra</th>
            <th>Quantidade de produtos</th>
            <th>Produtos entregues</th>
            <th>Produtos devolvidos</th>
            <th>Valor total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaFiltrada !== null &&
            (listaFiltrada.length === 0 ? (
              <h2>Não há pedidos cadastrados!</h2>
            ) : (
              listaFiltrada.map((pedido) => (
                <tr key={pedido.codigo}>
                  <td>{pedido.codigo}</td>
                  <td>{pedido.nomec}</td>
                  <td>{pedido.nomev}</td>
                  <td>{new Date(pedido.data_pedido).toLocaleDateString()}</td>
                  <td>{pedido.quantidadetotal}</td>
                  <td>{pedido.entregue}</td>
                  <td>{pedido.devolvido}</td>
                  <td>R${(pedido.valorfinal / 100).toFixed(2)}</td>
                  <td>
                    <button
                      style={{ background: "darkred", color: "white" }}
                      onClick={() => handleRemover(pedido.codigo)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaVendas;
