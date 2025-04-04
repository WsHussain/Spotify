import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ArtistDetailPage.css';

function ArtistDetailPage() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // ARTISTE
        fetch(`http://localhost:8000/artists/${id}`)
            .then(response => {
                if (!response.ok) throw new Error('Artist not found');
                return response.json();
            })
            .then(data => setArtist(data))
            .catch(error => setError(error.message));

        // ALBUMSS
        fetch(`http://localhost:8000/albums/artist/${id}`)
            .then(response => {
                if (!response.ok) throw new Error('Albums not found');
                return response.json();
            })
            .then(data => setAlbums(data))
            .catch(error => console.error(error));
    }, [id]);

    const handleAlbumClick = (albumId) => {
        navigate(`/album/${albumId}`);
    };

    if (error) {
        return (
            <div className="artist-detail-container error-container">
                <p className="error-message">Error: {error}</p>
                <button className="btn-spotify" onClick={() => navigate(-1)}>
                    Retour
                </button>
            </div>
        );
    }

    if (!artist) {
        return (
            <div className="artist-detail-container loading-container">
                <div className="loading-animation"></div>
            </div>
        );
    }

    return (
        <div className="artist-detail-container">
            <div className="artist-header-bg"></div>
            
            <div className="artist-content">
                <button className="btn-spotify back-button" onClick={() => navigate(-1)}>
                    <span className="arrow-icon">←</span> Retour
                </button>
                
                <div className="artist-header">
                    <div className="artist-image-container">
                        <img 
                            src={artist.photo} 
                            alt={artist.name} 
                            className="artist-photo"
                            onError={(e) => {
                                console.log('ya pas de photo');
                            }}
                        />
                    </div>
                    
                    <div className="artist-info">
                        <p className="artist-type">ARTISTE</p>
                        <h1 className="artist-name">{artist.name}</h1>
                    </div>
                </div>

                <div className="artist-details">
                    <h2 className="section-title">À PROPOS</h2>
                    <div className="about-section">
                    </div>

                    <h2 className="section-title">BIOGRAPHIE</h2>
                    <p className="artist-bio">
                        {artist.bio || 'Aucune biographie disponible pour cet artiste.'}
                    </p>
                </div>

                <div className="albums-section">
                    <h2 className="section-title">ALBUMS</h2>
                    <div className="albums-grid">
                        {albums.map(album => (
                            <div 
                                key={album.id} 
                                className="album-card"
                                onClick={() => handleAlbumClick(album.id)}
                            >
                                <img
                                    src={album.cover}
                                    alt={album.title}
                                    className="album-cover"
                                    onError={(e) => {
                                        console.log('ya pas');
                                    }}
                                />
                                <h3 className="album-title">{album.title}</h3>
                                <p className="album-year">{album.year}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtistDetailPage;