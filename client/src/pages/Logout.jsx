import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../service/axiosInstance';
import './Logout.css'; // Импорт CSS-файла

/* eslint-disable react/prop-types */
function Logout({ user, setUser }) {
  const navigate = useNavigate();

  const logoutUser = (event) => {
    event.preventDefault();
    
    axiosInstance.delete('/auth/logout')
      .then(({ data }) => {
        setAccessToken(data.accessToken);
        setUser(null);
        navigate('/auth/authorization');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h1>{user.name}, вы точно хотите выйти?</h1>
      <button onClick={logoutUser}>Да, я за новыми фотками!</button>
    </div>
  );
}

export default Logout;
