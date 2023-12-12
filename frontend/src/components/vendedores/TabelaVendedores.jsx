// src/TabelaVendedores.jsx
import React from "react";
import "./TabelaVendedores.css";
import BarraPesquisa from "../pesquisa/BarraPesquisa";

function TabelaVendedores({ listaVendedores, onSelectVendedor, onRemover }) {
  const [textoFiltragem, setTextoFiltragem] = React.useState("");
  const [listaFiltrada, setListaFiltrada] = React.useState([]);

  React.useEffect(() => {
    if (listaVendedores !== null && listaVendedores !== undefined) {
      const filtrados = listaVendedores.filter((vendedor) => {
        const texto = textoFiltragem.toLowerCase().trim();
        return (
          vendedor.usuario.toLowerCase().includes(texto) ||
          vendedor.nome.toLowerCase().includes(texto)
        );
      });

      setListaFiltrada(filtrados);
    }
  }, [listaVendedores, textoFiltragem]);

  const handleRemover = (vendedor) => {
    vendedor.ativo = !vendedor.ativo;
    onRemover(vendedor.codigo, vendedor);
  };

  return (
    <div className="tabela-container">
      {listaVendedores == null ? (
        <h1>Carregando a lista de vendedores...</h1>
      ) : (
        <>
          <BarraPesquisa
            setTextoFiltragem={setTextoFiltragem}
            textoFiltragem={textoFiltragem}
            textoPlaceholder={"Pesquise pelo usuário ou nome do vendedor"}
          />
          <table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Nome</th>
                <th>Administrador?</th>
                <th>Ativo?</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.map((vendedor) => (
                <tr key={vendedor.codigo}>
                  <td>{vendedor.usuario}</td>
                  <td>{vendedor.nome}</td>
                  <td>{vendedor.administrador ? "Sim" : "Não"}</td>
                  <td>{vendedor.ativo ? "Sim" : "Não"}</td>
                  <td>
                    <button
                      className="editar"
                      onClick={() => onSelectVendedor(vendedor)}
                    >
                      Editar
                    </button>
                    <button
                      className="remover"
                      onClick={() => handleRemover(vendedor)}
                    >
                      {vendedor.ativo ? "Desativar" : "Ativar"}
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
}

export default TabelaVendedores;
