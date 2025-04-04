import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AlbumPage';
import './ArtistPage.css';

function ArtistPage() {
    const { id } = useParams();
    const [artistData, setArtistData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch(`http://localhost:8000/artists/`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => setArtistData(data))
        .catch(error => setError(error.message));
    }, [id]);

    const handleArtistClick = (artistId) => {
        navigate(`/artists/${artistId}`);
    };

    return (
        <div className="artist-page-wrapper">
            <h1>Artistes</h1>
            <div className="artistData-container">
              {error ? (
                <p>Error: {error}</p>
              ) : !artistData ? (
                <p>Loading...</p>
              ) : (
                artistData.map(artist => (
                  <div 
                    key={artist.id} 
                    className="artist-card" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleArtistClick(artist.id)}
                  >
                    <img
                      src={artist.photo}
                      alt={`Cover de ${artist.name}`}
                      className="artist-photo"
                      onError={(e) => {
                        console.log('Image not found, setting placeholder');
                      }}
                    />
                    <div className="artist-info">
                      <p className="artist-name">{artist.name}</p>
                      <p className="artist-id">#{artist.id}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
        </div>
    );
}

export default ArtistPage;