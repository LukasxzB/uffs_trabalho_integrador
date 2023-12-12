import React from "react";
import Navbar from "../Navbar";
import "./Dashboard.css";
import { RequestSender } from "../../utils/request-sender";
import TabelaPedidosNaoEntregues from "./TabelaPedidosNaoEntregues";

function Dashboard({ onLogout }) {
  const [info, setInfo] = React.useState({
    quantidade30dias: null,
    quantidadeClientes: null,
    valor30dias: null,
  });

  const [naoEntregues, setNaoEntregues] = React.useState(null);

  React.useEffect(() => {
    RequestSender().get("/orders/info", (data) => {
      setInfo({
        quantidade30dias: data.quantidade30dias,
        quantidadeClientes: data.quantidadeClientes,
        valor30dias: (data.valor30dias / 100).toFixed(2),
      });
    });

    RequestSender().get("/orders/all/notdelivered", (data) => {
      setNaoEntregues(data);
    });
  }, []);

  return (
    <div>
      <Navbar onLogout={onLogout} />
      <div className="linha-separadora"></div>
      <div className="conteudo-container">
        <table className="informacoes-dashboard">
          <thead>
            <tr>
              <th className="azul-escuro">Pedidos nos últimos 30 dias</th>
              <th className="azul-escuro">Entrada nos últimos 30 dias</th>
              <th className="azul-escuro">Quantidade de clientes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{info.quantidade30dias ?? "Carregando..."}</td>
              <td>R${info.valor30dias ?? " carregando..."}</td>
              <td>{info.quantidadeClientes ?? "Carregando..."}</td>
            </tr>
          </tbody>
        </table>

        <h4 style={{ marginTop: 10 }}>Lista de produtos ainda não entregues</h4>
        <TabelaPedidosNaoEntregues listaProdutos={naoEntregues} />
      </div>
    </div>
  );
}

export default Dashboard;
