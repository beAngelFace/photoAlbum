import React, { useState, useEffect } from 'react';
import axiosInstance from '../service/axiosInstance';
import { Link } from 'react-router-dom';
import './Albums.css'; // Импорт CSS-файла

export default function Albums({ user }) {
  const [albums, setAlbums] = useState([]);
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const { data } = await axiosInstance.get('/albums');
      setAlbums(data);
    } catch (error) {
      console.error('Ошибка при получении альбомов:', error);
    }
  };

  const addAlbum = async () => {
    try {
      const { data } = await axiosInstance.post('/albums', { title, cover, userId: user.id });
      setAlbums([...albums, data]);
      setTitle('');
      setCover('');
    } catch (error) {
      console.error('Ошибка при добавлении альбома:', error);
    }
  };

  const updateAlbum = async (id) => {
    try {
      await axiosInstance.put(`/albums/${id}`, { title, cover });
      setAlbums(albums.map(album => album.id === id ? { ...album, title, cover } : album));
      setTitle('');
      setCover('');
      setIsEditing(false);
      setCurrentAlbum(null);
    } catch (error) {
      console.error('Ошибка при обновлении альбома:', error);
    }
  };

  const deleteAlbum = async (id) => {
    try {
      await axiosInstance.delete(`/albums/${id}`);
      setAlbums(albums.filter(album => album.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении альбома:', error);
    }
  };

  const editAlbum = (album) => {
    setIsEditing(true);
    setCurrentAlbum(album);
    setTitle(album.title);
    setCover(album.cover);
  };

  return (
    <div>
      <h1>Альбомы</h1>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Название альбома"
      />
      <input 
        type="text" 
        value={cover} 
        onChange={(e) => setCover(e.target.value)} 
        placeholder="Обложка альбома (URL)"
      />
      <button onClick={isEditing ? () => updateAlbum(currentAlbum.id) : addAlbum}>
        {isEditing ? 'Обновить' : 'Добавить'}
      </button>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            <div>
              {album.title} - <img src={album.cover} alt={album.title} />
            </div>
            <div className="album-actions">
              <Link to={`/albums/${album.id}/photos`}>Просмотр фотографий</Link>
              <button onClick={() => editAlbum(album)}>Редактировать</button>
              <button onClick={() => deleteAlbum(album.id)}>Удалить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
