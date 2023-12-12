import React from "react";

const TabelaProdutosPedido = ({ produtosInseridos, onRemover }) => {
  const handleRemover = (produto) => {
    onRemover(produto.codigoid);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome do produto</th>
            <th>Valor unitário</th>
            <th>Quantidade</th>
            <th>Desconto</th>
            <th>Valor final</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {produtosInseridos !== null &&
            produtosInseridos !== undefined &&
            produtosInseridos.map((produto) => (
              <tr key={produto.codigo}>
                <td>{produto.codigo}</td>
                <td>{produto.titulo}</td>
                <td>R${(produto.valor / 100).toFixed(2)}</td>
                <td>{produto.quantidade}</td>
                <td>{produto.desconto}</td>
                <td>R$ {(produto.final / 100).toFixed(2)}</td>
                <td>
                  <button
                    style={{ background: "darkred", color: "white" }}
                    onClick={() => handleRemover(produto)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaProdutosPedido;
