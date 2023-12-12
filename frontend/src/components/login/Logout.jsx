import React from "react";
import "./Logout.css";

function Logout({ onLogout }) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <button className="botao-sair" onClick={handleLogout}>
      Sair
    </button>
  );
}

export default Logout;
