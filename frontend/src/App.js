import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import TestPage from './components/TestPage';
import AlbumPage from './components/AlbumPage';
import ArtistPage from './components/ArtistPage';
import './App.css';
import ArtistDetailPage from './components/ArtistDetailPage';

function App() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/albums?page=0&limit=100')
      .then(response => response.json())
      .then(data => setAlbums(data))
      .catch(error => console.error('Erreur de récupération des albums:', error));
  }, []);

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/test">Test Page</Link> |
        <Link to ="/artist">Liste des artistes</Link>
      </nav>
      
      <Routes>
        <Route path="/test" element={<TestPage />} />
        <Route path="/album/:id" element={<AlbumPage />} />
        <Route path="/artist" element={<ArtistPage />} />
        <Route path="/artists/:id" element={<ArtistDetailPage />} />
        <Route path="/" element={
          <div>
            <h1>Albums</h1>
            <div className="albums-container">
              {albums.map(album => (
                <div 
                  key={album.id} 
                  className="album-card" 
                  onClick={() => navigate(`/album/${album.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={album.cover}
                    alt={`Cover de ${album.name}`}
                    className="album-cover"
                    }
                  />
                  <div className="album-info">
                    <p className="album-name">{album.name}</p>
                    <p className="album-id">#{album.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;

