/* eslint-disable react/prop-types */
import React from 'react';
import Albums from './Albums'; // Импорт компонента Albums
import './HomePage.css'; // Импорт CSS-файла

function HomePage({ user }) {
  return (
    <div className="container">
      <h1>Домашняя страница</h1>
      <h2>Здравствуй, {user ? user.name : "Незнакомец"}</h2>
      <div>
        <Albums user={user} /> {/* Вывод компонента Albums */}
      </div>
    </div>
  );
}

export default HomePage;
