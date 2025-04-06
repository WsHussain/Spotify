import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const [randomAlbums, setRandomAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/albums?page=0&limit=100')
      .then(response => response.json())
      .then(data => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setRandomAlbums(shuffled.slice(0, 12));
      })
      .catch(error => console.error('Erreur de récupération des albums:', error));
  }, []);

  return (
    <div className="page-container">
      <h1>Welcome to Spotify Clone</h1>
      <div className="welcome-links">
        <button onClick={() => navigate('/artists')} className="nav-button">
          Discover Artists
        </button>
        <button onClick={() => navigate('/genres')} className="nav-button">
          Browse Genres
        </button>
        <button onClick={() => navigate('/albums')} className="nav-button">
          View All Albums
        </button>
      </div>
      <h2>Featured Albums</h2>
      <div className="albums-container">
        {randomAlbums.map(album => (
          <div 
            key={album.id} 
            className="album-card" 
            onClick={() => navigate(`/album/${album.id}`)}
          >
            <img
              src={album.cover}
              alt={`Cover de ${album.name}`}
              className="album-cover"
            />
            <div className="album-info">
              <p className="album-name">{album.name}</p>
              <p className="album-id">#{album.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
