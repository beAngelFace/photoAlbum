/* eslint-disable react/prop-types */
import { useState } from "react";
import axiosInstance, { setAccessToken } from "../service/axiosInstance";
import { useNavigate } from "react-router-dom";
import './Auth.css'; // Импорт CSS-файла

function RegistrationPage({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const registrationUser = (event) => {
    event.preventDefault();

    if (confirm === password) {
      axiosInstance.post("/auth/registration", { name, email, password })
        .then(({ data }) => {
          setAccessToken(data.accessToken);
          setUser(data.user);
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Регистрация</h1>
        <form onSubmit={registrationUser}>
          <input type="text" onChange={({ target }) => setName(target.value)} placeholder="Имя" required />
          <input type="text" onChange={({ target }) => setEmail(target.value)} placeholder="Email" required />
          <input type="password" onChange={({ target }) => setPassword(target.value)} placeholder="Пароль" required />
          <input type="password" onChange={({ target }) => setConfirm(target.value)} placeholder="Подтвердите пароль" required />
          <button type="submit">Регистрация</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
