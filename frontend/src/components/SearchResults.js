import React from 'react';
import { useNavigate } from 'react-router-dom';

function SearchResults({ results }) {
  const navigate = useNavigate();

  if (!Array.isArray(results) || results.length === 0) {
    return <div className="search-results">Aucun résultat trouvé</div>;
  }

  return (
    <div className="search-results">
      <div className="albums-container">
        {results.map(album => (
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

export default SearchResults;
