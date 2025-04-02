import React, { useEffect, useState } from 'react';
    import './App.css';
 
function App() {
  const [albums, setAlbums] = useState([]);
 
  useEffect(() => {
        fetch('http://localhost:8000/albums?page=0&limit=100')
      .then(response => response.json())
          .then(data => setAlbums(data))
      .catch(error => console.error('Erreur de récupération des albums:', error));
  }, []);
 
  return (
    <div className="App">
      <h1>Liste des Albums</h1>
          <div className="albums-container">
        {albums.map(album => (
              <div key={album.id} className="album-card">
                <img
                  src={album.cover}
                  alt={`Cover de ${album.name}`}
                  className="album-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
                <div className="album-info">
                  <p>ID: {album.id}</p>
                  <p>Nom: {album.name}</p>
                </div>
              </div>
        ))}
          </div>
    </div>
  );
}
 
export default App;