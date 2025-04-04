import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArtistPage.css';

function ArtistPage() {
    const [artists, setArtists] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/artists/`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setArtists(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleArtistClick = (artistId) => {
        navigate(`/artists/${artistId}`);
    };

    if (loading) {
        return (
            <div className="artists-page loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="artists-page error-container">
                <p className="error-message">Erreur: {error}</p>
            </div>
        );
    }

    return (
        <div className="artists-page">
            <div className="artists-header">
                <h1 className="section-title">Artistes populaires</h1>
            </div>
            
            <div className="artists-grid">
                {artists && artists.map(artist => (
                    <div 
                        key={artist.id} 
                        className="artist-card" 
                        onClick={() => handleArtistClick(artist.id)}
                    >
                        <div className="artist-img-container">
                            <img
                                src={artist.photo}
                                alt={artist.name}
                                className="artist-img"
                                onError={(e) => {
                                    e.target.src = 'https://i.scdn.co/image/ab6761610000e5eb1020c22e0ce742eca7166c3b';
                                }}
                            />
                        </div>
                        <div className="artist-info">
                            <h3 className="artist-name">{artist.name}</h3>
                            <p className="artist-type">Artiste</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArtistPage;