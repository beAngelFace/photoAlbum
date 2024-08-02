import React, { useState, useEffect } from 'react';
import axiosInstance from '../service/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import './Photos.css'; // Импорт CSS-файла

export default function Photos({ user }) {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data } = await axiosInstance.get(`/photos?albumId=${albumId}`);
      setPhotos(data);
    } catch (error) {
      console.error('Ошибка при получении фотографий:', error);
    }
  };

  const addPhoto = async () => {
    try {
      const { data } = await axiosInstance.post('/photos', { photo, description, albumId });
      setPhotos([...photos, data]);
      setPhoto('');
      setDescription('');
    } catch (error) {
      console.error('Ошибка при добавлении фотографии:', error);
    }
  };

  const deletePhoto = async (id) => {
    try {
      await axiosInstance.delete(`/photos/${id}`);
      setPhotos(photos.filter(photo => photo.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении фотографии:', error);
    }
  };

  return (
    <div className="container">
      <h1>Фотографии</h1>
      <button onClick={() => navigate(-1)}>Назад</button>
      <input 
        type="text" 
        value={photo} 
        onChange={(e) => setPhoto(e.target.value)} 
        placeholder="URL фотографии"
      />
      <input 
        type="text" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Описание"
      />
      <button onClick={addPhoto}>Добавить</button>
      <ul>
        {photos.map(photo => (
          <li key={photo.id}>
            <div>
              <img src={photo.photo} alt={photo.description} />
              {photo.description}
            </div>
            <button onClick={() => deletePhoto(photo.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
