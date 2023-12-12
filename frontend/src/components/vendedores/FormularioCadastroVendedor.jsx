import React from "react";
import "./FormularioVendedor.css";

const FormularioCadastroVendedor = ({
  onCadastrar,
  onEditar,
  editVendedor,
  resetEdit,
}) => {
  const [vendedor, setVendedor] = React.useState({
    codigo: "",
    ativo: true,
    usuario: "",
    senha: "",
    nome: "",
    administrador: false,
  });

  React.useEffect(() => {
    if (editVendedor == null) return;

    setVendedor({
      codigo: editVendedor?.codigo ?? "",
      ativo: editVendedor?.ativo ?? true,
      usuario: editVendedor?.usuario ?? "",
      senha: "",
      nome: editVendedor?.nome ?? "",
      administrador: editVendedor?.administrador ?? false,
    });
  }, [editVendedor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendedor((prevVendedor) => ({
      ...prevVendedor,
      [name]: value,
    }));
  };

  const handleCancelar = () => {
    setVendedor({
      ativo: true,
      usuario: "",
      senha: "",
      nome: "",
      administrador: false,
    });
    resetEdit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCadastrar(vendedor);
    setVendedor({
      ativo: true,
      usuario: "",
      senha: "",
      nome: "",
      administrador: false,
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (vendedor.senha === "") delete vendedor.senha;
    onEditar(vendedor.codigo, vendedor);
    setVendedor({
      ativo: true,
      codigo: "",
      usuario: "",
      senha: "",
      nome: "",
      administrador: false,
    });
  };

  return (
    <form
      className="formulario-cadastro-cliente"
      onSubmit={editVendedor !== null ? handleSubmitEdit : handleSubmit}
    >
      <div className="form-row">
        <div className="input-group">
          <label>
            *Usuário para login
            <input
              type="text"
              name="usuario"
              value={vendedor.usuario}
              onChange={handleChange}
              placeholder="joao.pedro"
              required
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            {editVendedor === null ? "*" : ""}Senha
            <input
              type="password"
              name="senha"
              value={vendedor.senha}
              onChange={handleChange}
              placeholder="***********"
              required={editVendedor === null}
            />
          </label>
        </div>
      </div>
      <label>
        *Nome
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={vendedor.nome}
          onChange={handleChange}
          required
        />
      </label>
      <div className="form-row">
        <div className="input-group">
          <label>
            Administrador?
            <input
              type="checkbox"
              name="administrador"
              checked={vendedor.administrador}
              onChange={(e) =>
                setVendedor({ ...vendedor, administrador: e.target.checked })
              }
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Ativo?
            <input
              type="checkbox"
              name="ativo"
              checked={vendedor.ativo}
              onChange={(e) =>
                setVendedor({ ...vendedor, ativo: e.target.checked })
              }
            />
          </label>
        </div>
      </div>
      <button type="submit">
        {editVendedor !== null ? "Editar vendedor" : "Cadastrar vendedor"}
      </button>
      {editVendedor !== null ? (
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

export default FormularioCadastroVendedor;
