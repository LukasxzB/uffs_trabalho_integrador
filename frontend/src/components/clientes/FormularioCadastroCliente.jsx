// src/FormularioCadastroCliente.jsx
import React from "react";
import "./FormularioCliente.css";

const FormularioCadastroCliente = ({
  onCadastrar,
  onEditar,
  editCliente,
  resetEdit,
}) => {
  const [cliente, setCliente] = React.useState({
    cpf: "",
    nome: "",
    nascimento: "",
    email: "",
    endereco: "",
    telefone: "",
  });

  React.useEffect(() => {
    if (editCliente == null) return;

    setCliente({
      cpf: editCliente?.cpf ?? "",
      nome: editCliente?.nome ?? "",
      nascimento: editCliente?.nascimento ?? "",
      email: editCliente?.email ?? "",
      endereco: editCliente?.endereco ?? "",
      telefone: editCliente?.telefone ?? "",
    });
  }, [editCliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
  };

  const handleCancelar = () => {
    setCliente({
      cpf: "",
      nome: "",
      nascimento: "",
      email: "",
      endereco: "",
      telefone: "",
    });
    resetEdit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCadastrar(cliente);
    setCliente({
      cpf: "",
      nome: "",
      nascimento: "",
      email: "",
      endereco: "",
      telefone: "",
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    onEditar(cliente);
    setCliente({
      cpf: "",
      nome: "",
      nascimento: "",
      email: "",
      endereco: "",
      telefone: "",
    });
  };

  return (
    <form
      className="formulario-cadastro-cliente"
      onSubmit={editCliente !== null ? handleSubmitEdit : handleSubmit}
    >
      <div className="form-row">
        <div className="input-group">
          <label>
            *CPF do cliente
            <input
              type="text"
              name="cpf"
              value={cliente.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00"
              required
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            *Nome completo
            <input
              type="text"
              name="nome"
              value={cliente.nome}
              onChange={handleChange}
              placeholder="Nome completo"
              required
            />
          </label>
        </div>
      </div>
      <div className="form-row">
        <div className="input-group">
          <label>
            *Data do nascimento
            <input
              type="text"
              name="nascimento"
              placeholder="dd/mm/aaaa"
              value={cliente.nascimento}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            *Endereço completo
            <input
              type="text"
              name="endereco"
              value={cliente.endereco}
              onChange={handleChange}
              placeholder="Pedido será entregue aqui"
              required
            />
          </label>
        </div>
      </div>
      <div className="form-row">
        <div className="input-group">
          <label>
            Telefone
            <input
              type="text"
              name="telefone"
              value={cliente.telefone}
              placeholder="(00) 00000-0000"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Email
            <input
              type="text"
              name="email"
              value={cliente.email}
              onChange={handleChange}
              placeholder="cliente@email.com"
            />
          </label>
        </div>
      </div>
      <button type="submit">
        {editCliente !== null ? "Editar cliente" : "Cadastrar cliente"}
      </button>
      {editCliente !== null ? (
        <button
          className="cancelar-botao"
          type="button"
          onClick={handleCancelar}
        >
          Cancelar edição
        </button>
      ) : (
        <></>
      )}
    </form>
  );
};

export default FormularioCadastroCliente;
