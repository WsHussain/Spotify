import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AlbumPage from './components/AlbumPage';
import ArtistDetailPage from './components/ArtistDetailPage';
import ArtistPage from './components/ArtistPage';
import GenreList from './components/GenreList';
import GenreDetail from './components/GenreDetail';
import './App.css';

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
      <nav className="nav-menu">
        <Link to="/" className="nav-link">Home</Link> |
        <Link to="/artists" className="nav-link">Artists</Link> |
        <Link to="/genres" className="nav-link">Genres</Link> |
        <Link to="/albums" className="nav-link">Albums</Link>
      </nav>
      
      <Routes>
        <Route path="/artists" element={<ArtistPage />} />
        <Route path="/artists/:id" element={<ArtistDetailPage />} />
        <Route path="/genres" element={<GenreList />} />
        <Route path="/genres/:id" element={<GenreDetail />} />
        <Route path="/album/:id" element={<AlbumPage />} />
        <Route path="/albums" element={
          <div className="page-container">
            <h1>Albums</h1>
            <div className="albums-container">
              {albums.map(album => (
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
        } />
        <Route path="/" element={
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
                View Albums
              </button>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;

