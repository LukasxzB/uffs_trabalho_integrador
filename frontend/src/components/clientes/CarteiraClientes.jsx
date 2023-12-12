// src/CarteiraClientes.jsx
import React, { useState } from "react";
import Navbar from "../Navbar";
import TabelaClientes from "./TabelaClientes";
import FormularioCadastroCliente from "./FormularioCadastroCliente";
import { RequestSender } from "../../utils/request-sender";

function CarteiraClientes({ onLogout }) {
  // Estado para armazenar os clientes (null = carregando)
  const [clientes, setClientes] = useState(null);
  const [editCliente, setEditCliente] = React.useState(null);

  const handleSelectEdit = (cliente) => {
    setEditCliente(cliente);
  };

  // carregar os clientes do backend
  React.useEffect(() => {
    RequestSender().get("/customers", (res) => {
      setClientes(res);
    });
  }, []);

  const cadastrarCliente = (novoCliente) => {
    const { nascimento, telefone, email } = novoCliente;
    novoCliente.nascimento = nascimento === "" ? null : nascimento;
    novoCliente.telefone = telefone === "" ? null : telefone;
    novoCliente.email = email === "" ? null : email;

    RequestSender().post("/customers", novoCliente, (res) => {
      setClientes([...clientes, novoCliente]);
    });
  };

  const editarCliente = (novoCliente) => {
    const { nascimento, telefone, email } = novoCliente;
    novoCliente.nascimento = nascimento === "" ? null : nascimento;
    novoCliente.telefone = telefone === "" ? null : telefone;
    novoCliente.email = email === "" ? null : email;

    console.log(novoCliente);

    RequestSender().put(`/customers/${novoCliente.cpf}`, novoCliente, () => {
      setClientes(
        clientes.map((c) => (c.cpf === novoCliente.cpf ? novoCliente : c))
      );
      setEditCliente(null);
    });
  };

  const cancelarEdit = () => {
    setEditCliente(null);
  };

  return (
    <div>
      <Navbar onLogout={onLogout} />
      <FormularioCadastroCliente
        onCadastrar={cadastrarCliente}
        onEditar={editarCliente}
        editCliente={editCliente}
        resetEdit={cancelarEdit}
      />
      <TabelaClientes
        listaClientes={clientes}
        onEdit={editarCliente}
        onSelectCliente={handleSelectEdit}
      />
    </div>
  );
}

export default CarteiraClientes;
