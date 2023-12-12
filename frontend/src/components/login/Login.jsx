// src/Login.jsx
import React from "react";
import "./Login.css";
import { RequestSender } from "../../utils/request-sender";

const Login = ({ onLogin }) => {
  const handleLogin = (event) => {
    event.preventDefault();

    const usuario = event.target.username.value;
    const senha = event.target.password.value;

    RequestSender().post("/auth/signin", { usuario, senha }, (data) => {
      console.log(data);
      onLogin(data.token);
    });
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="user-box">
            <input type="text" name="username" required />
            <label>Usuário</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required />
            <label>Senha</label>
          </div>
          <div className="submit-btn">
            <input type="submit" value="Entrar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
