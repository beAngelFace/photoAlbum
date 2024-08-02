/* eslint-disable react/prop-types */
import { useState } from "react";
import axiosInstance, { setAccessToken } from "../service/axiosInstance";
import { useNavigate } from "react-router-dom";
import './Auth.css'; // Импорт CSS-файла

function AuthorizationPage({ setUser }) {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const authorizationUser = (event) => {
    event.preventDefault();
    axiosInstance.post('/auth/authorization', { email, password })
      .then(({ data }) => {
        setAccessToken(data.accessToken);
        setUser(data.user);
        navigate('/');
      })
      .catch(err => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Авторизация</h1>
        <form onSubmit={authorizationUser}>
          <input type="text" onChange={({ target }) => setEmail(target.value)} placeholder="Email" required />
          <input type="password" onChange={({ target }) => setPassword(target.value)} placeholder="Пароль" required />
          <button type="submit">Авторизация</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default AuthorizationPage;
