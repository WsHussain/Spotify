import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AlbumPage from './components/AlbumPage';
import ArtistDetailPage from './components/ArtistDetailPage';
import ArtistPage from './components/ArtistPage';
import GenreList from './components/GenreList';
import GenreDetail from './components/GenreDetail';
import MainPage from './components/MainPage';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import './App.css';

function App() {
  const [albums, setAlbums] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/albums')
      .then(response => response.json())
      .then(data => setAlbums(data))
      .catch(error => console.error('Erreur de récupération des albums:', error));
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const term = searchTerm.toLowerCase();
    const filtered = albums.filter(album => 
      album.name.toLowerCase().includes(term)
    );
    setSearchResults(filtered);
  };

  return (
    <div className="App">
      <nav className="nav-menu">
        <Link to="/" className="nav-link">Home</Link> |
        <Link to="/artists" className="nav-link">Artists</Link> |
        <Link to="/genres" className="nav-link">Genres</Link> |
        <Link to="/albums" className="nav-link">Albums</Link>
      </nav>
      <SearchBar onSearch={handleSearch} />
      {isSearching && <SearchResults results={searchResults} />}
      {!isSearching && (
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
          <Route path="/" element={<MainPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

