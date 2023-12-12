// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import CarteiraClientes from "./clientes/CarteiraClientes";
import CarteiraProdutos from "./produtos/CarteiraProdutos";
import CarteiraVendas from "./vendas/CarteiraVendas";
import axios from "axios";
import Dashboard from "./dashboard/Dashboard";
import CarteiraVendedores from "./vendedores/CarteiraVendedores";
import IsUserAdm from "../utils/is-adm";
import PaginaNaoEncontrada from "./404/Pagina404";
import CarteiraPedidos from "./criar_pedido/CarteiraPedidos";
import ConsultarPedido from "./consultar_pedido/ConsultarPedido";

axios.defaults.baseURL = "http://localhost:25565/";
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) handleLogin(token);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    axios.defaults.headers.common["Authorization"] = undefined;
  };

  return (
    <>
      {isLoggedIn ? (
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard onLogout={handleLogout} />} />
            <Route
              path="/carteira_clientes"
              element={<CarteiraClientes onLogout={handleLogout} />}
            />
            <Route
              path="/carteira_produtos"
              element={<CarteiraProdutos onLogout={handleLogout} />}
            />
            <Route
              path="/carteira_vendas"
              element={<CarteiraVendas onLogout={handleLogout} />}
            />
            <Route
              path="/gerar_pedido"
              element={<CarteiraPedidos onLogout={handleLogout} />}
            />
            <Route
              path="/consultar_pedido"
              element={<ConsultarPedido onLogout={handleLogout} />}
            />
            {IsUserAdm() && (
              <Route
                path="/carteira_vendedores"
                element={<CarteiraVendedores onLogout={handleLogout} />}
              />
            )}
            <Route
              path="*"
              caseSensitive={false}
              element={<PaginaNaoEncontrada />}
            />
          </Routes>
        </Router>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
};

export default App;
