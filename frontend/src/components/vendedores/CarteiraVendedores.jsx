import React, { useState } from "react";
import Navbar from "../Navbar";
import { RequestSender } from "../../utils/request-sender";
import FormularioCadastroVendedor from "./FormularioCadastroVendedor";
import TabelaVendedores from "./TabelaVendedores";

function CarteiraVendedores({ onLogout }) {
  const [vendedores, setVendedores] = useState(null);
  const [editVendedor, setEditVendedor] = React.useState(null);

  const handleSelectEdit = (vendedor) => {
    setEditVendedor(vendedor);
  };

  React.useEffect(() => {
    RequestSender().get("/users", (res) => {
      setVendedores(res);
    });
  }, []);

  const cadastrarVendedor = (novoVendedor) => {
    RequestSender().post("/users", novoVendedor, (res) => {
      setVendedores([...vendedores, novoVendedor]);
    });
  };

  const editarVendedor = (codigo, novoVendedor) => {
    RequestSender().put(`/users/${codigo}`, novoVendedor, () => {
      setVendedores(
        vendedores.map((v) =>
          v.codigo === novoVendedor.codigo ? novoVendedor : v
        )
      );
      setEditVendedor(null);
    });
  };

  const handleToggleVendedor = (codigo, vendedorRemovido) => {
    RequestSender().put(`/users/${codigo}`, vendedorRemovido, () => {
      setVendedores(
        vendedores.map((p) => (p.codigoid === codigo ? vendedorRemovido : p))
      );
    });
  };

  const cancelarEdit = () => {
    setEditVendedor(null);
  };

  return (
    <div>
      <Navbar onLogout={onLogout} />
      <FormularioCadastroVendedor
        onCadastrar={cadastrarVendedor}
        onEditar={editarVendedor}
        editVendedor={editVendedor}
        resetEdit={cancelarEdit}
      />
      <TabelaVendedores
        listaVendedores={vendedores}
        onEdit={editarVendedor}
        onRemover={handleToggleVendedor}
        onSelectVendedor={handleSelectEdit}
      />
    </div>
  );
}

export default CarteiraVendedores;
