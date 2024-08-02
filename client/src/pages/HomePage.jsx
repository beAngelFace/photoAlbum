/* eslint-disable react/prop-types */
import React from 'react';
import Albums from './Albums'; // Импорт компонента Albums
import './HomePage.css'; // Импорт CSS-файла

function HomePage({ user }) {
  return (
    <div className="home-container">
      <h1>Главная</h1>
      {user ? (
        <div>
          <h2>Привет, {user.name}!</h2>
          <Albums user={user} /> {/* Вывод компонента Albums */}
        </div>
      ) : (
        <div className="auth-forms">
          <div className="auth-form">
            <h2>Авторизация</h2>
            <p>Пожалуйста, войдите в свой аккаунт.</p>
            <a href="/auth/authorization" className="auth-link">Войти</a>
          </div>
          <div className="auth-form">
            <h2>Регистрация</h2>
            <p>Еще нет аккаунта? Зарегистрируйтесь.</p>
            <a href="/auth/registration" className="auth-link">Зарегистрироваться</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
