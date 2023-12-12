import React from "react";
import Navbar from "../Navbar";
import TabelaVendas from "./TabelaVendas";
import "./CarteiraVendas.css";
import { RequestSender } from "../../utils/request-sender";

function CarteiraVendas({ onLogout }) {
  const [pedidos, setPedidos] = React.useState(null);

  const onDeletar = (codigo) => {
    RequestSender().del(`/orders/${codigo}`, () => {
      setPedidos(pedidos.filter((pedido) => pedido.codigo !== codigo));
    });
  };

  React.useEffect(() => {
    RequestSender().get("/orders/all", (data) => {
      console.log(data);
      setPedidos(data);
    });
  }, []);

  return (
    <div>
      <Navbar onLogout={onLogout} />
      <div className="linha-separadora" />
      <div className="conteudo-container">
        <TabelaVendas pedidos={pedidos} onDeletar={onDeletar} />
      </div>
    </div>
  );
}

export default CarteiraVendas;
