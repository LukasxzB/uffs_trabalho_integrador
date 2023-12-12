// src/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logout from "./login/Logout";
import IsUserAdm from "../utils/is-adm";

function Navbar({ onLogout }) {
  return (
    <nav className="navbar th-verde">
      <div className="container-nav">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/carteira_clientes">Carteira de clientes</Link>
          </li>
          <li>
            <Link to="/carteira_produtos">Carteira de produtos</Link>
          </li>
          <li>
            <Link to="/carteira_vendas">Carteira de vendas</Link>
          </li>
          <li>
            <Link to="/gerar_pedido">Gerar pedido</Link>
          </li>
          <li>
            <Link to="/consultar_pedido">Consultar pedido</Link>
          </li>
          {IsUserAdm() && (
            <li>
              <Link to="/carteira_vendedores">Carteira vendedores</Link>
            </li>
          )}
        </ul>
        <Logout onLogout={onLogout} />
      </div>
    </nav>
  );
}

export default Navbar;
