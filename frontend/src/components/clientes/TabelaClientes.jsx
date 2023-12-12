// src/TabelaClientes.jsx
import React from "react";
import "./TabelaClientes.css";
import { RequestSender } from "../../utils/request-sender";
import BarraPesquisa from "../pesquisa/BarraPesquisa";

function TabelaClientes({ listaClientes, onEdit, onSelectCliente }) {
  const [textoFiltragem, setTextoFiltragem] = React.useState("");
  const [listaFiltrada, setListaFiltrada] = React.useState([]);

  React.useEffect(() => {
    if (listaClientes !== null && listaClientes !== undefined) {
      const filtrados = listaClientes.filter((cliente) => {
        const texto = textoFiltragem.toLowerCase().trim();
        return (
          cliente.cpf.toLowerCase().includes(texto) ||
          cliente.nome.toLowerCase().includes(texto) ||
          cliente.email?.toLowerCase().includes(texto)
        );
      });

      setListaFiltrada(filtrados);
    }
  }, [listaClientes, textoFiltragem]);

  const handleRemover = (cliente) => {
    cliente.ativo = !cliente.ativo;
    RequestSender().put(
      `/customers/${cliente.cpf}`,
      { ativo: cliente.ativo },
      () => onEdit(cliente)
    );
  };

  return (
    <div className="tabela-container">
      {listaClientes == null ? (
        <h1>Carregando a lista de clientes...</h1>
      ) : (
        <>
          <BarraPesquisa
            setTextoFiltragem={setTextoFiltragem}
            textoFiltragem={textoFiltragem}
            textoPlaceholder={"Pesquise pelo CPF, nome ou email do cliente"}
          />
          <table>
            <thead>
              <tr>
                <th>CPF</th>
                <th>Nome completo</th>
                <th>Nascimento</th>
                <th>Endereço</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Ativo?</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.map((cliente) => (
                <tr key={cliente.cpf}>
                  <td>{cliente.cpf}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.nascimento ?? "---"}</td>
                  <td>{cliente.endereco}</td>
                  <td>{cliente.telefone ?? "---"}</td>
                  <td>{cliente.email ?? "---"}</td>
                  <td>{cliente.ativo ? "Sim" : "Não"}</td>
                  <td>
                    <button
                      className="editar"
                      onClick={() => onSelectCliente(cliente)}
                    >
                      Editar
                    </button>
                    <button
                      className="remover"
                      onClick={() => handleRemover(cliente)}
                    >
                      {cliente.ativo ? "Desativar" : "Ativar"}
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

export default TabelaClientes;
