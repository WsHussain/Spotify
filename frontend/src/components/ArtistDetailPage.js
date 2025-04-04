import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ArtistDetailPage.css';

function ArtistDetailPage() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showBioPopup, setShowBioPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                setLoading(true);
                
                // Fetch artist details
                const artistResponse = await fetch(`http://localhost:8000/artists/${id}`);
                if (!artistResponse.ok) {
                    throw new Error('Artiste non trouvé');
                }
                const artistData = await artistResponse.json();
                setArtist(artistData);
                
                // Fetch artist albums
                const albumsResponse = await fetch(`http://localhost:8000/albums/artist/${id}`);
                if (albumsResponse.ok) {
                    const albumsData = await albumsResponse.json();
                    setAlbums(albumsData);
                }
                
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchArtistData();
    }, [id]);

    const handleAlbumClick = (albumId) => {
        navigate(`/album/${albumId}`);
    };
    
    const goBack = () => {
        navigate(-1);
    };
    
    const openBioPopup = () => {
        setShowBioPopup(true);
        document.body.style.overflow = 'hidden'; // Disable scroll on body when popup is open
    };
    
    const closeBioPopup = () => {
        setShowBioPopup(false);
        document.body.style.overflow = 'auto'; // Re-enable scroll on body
    };
    
    // Close popup when Escape key is pressed
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                closeBioPopup();
            }
        };
        
        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, []);
    
    if (loading) {
        return (
            <div className="artist-detail loading-container">
                <div className="spinner"></div>
            </div>
        );
    }
    
    if (error || !artist) {
        return (
            <div className="artist-detail error-container">
                <p className="error-message">{error || 'Artiste non trouvé'}</p>
                <button className="btn-spotify back-button" onClick={goBack}>
                    <i className="fas fa-arrow-left"></i> Retour
                </button>
            </div>
        );
    }

    return (
        <div className="artist-detail">
            {/* Header avec dégradé */}
            <div className="artist-header-bg">
                <div className="artist-header-gradient"></div>
            </div>
            
            {/* Bouton retour */}
            <button className="back-button" onClick={goBack}>
                <i className="fas fa-arrow-left"></i>
            </button>
            
            {/* Profil de l'artiste */}
            <div className="artist-profile">
                <div className="artist-photo-container">
                    <img 
                        src={artist.photo} 
                        alt={artist.name} 
                        className="artist-profile-photo"
                        onError={(e) => {
                            e.target.src = 'https://i.scdn.co/image/ab6761610000e5eb1020c22e0ce742eca7166c3b';
                        }}
                    />
                </div>
                
                <div className="artist-header-info">
                    <span className="verified-badge">
                        <i className="fas fa-check-circle"></i> Artiste vérifié
                    </span>
                    <h1 className="artist-profile-name">{artist.name}</h1>
                    <p className="artist-stats">
                        {albums.length} album{albums.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>
            
            {/* Contenu principal */}
            <div className="artist-content">
                {/* Section de biographie */}
                {artist.bio && (
                    <section className="biography-section">
                        <div className="bio-container">
                            <p className="bio-text">
                                {artist.bio.length > 300 
                                    ? <>{artist.bio.substring(0, 300)}... <span onClick={openBioPopup} className="read-more">Lire la suite</span></>
                                    : artist.bio
                                }
                            </p>
                        </div>
                    </section>
                )}
                
                {/* Section des albums */}
                <section className="discography-section">
                    <div className="section-header">
                        <h2 className="section-title">Discographie</h2>
                    </div>
                    
                    <div className="albums-grid">
                        {albums.map(album => (
                            <div 
                                key={album.id} 
                                className="album-card" 
                                onClick={() => handleAlbumClick(album.id)}
                            >
                                <div className="album-image-container">
                                    <img 
                                        src={album.cover || album.cover_small} 
                                        alt={album.name} 
                                        className="album-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://placeholder.pics/svg/300';
                                        }}
                                    />
                                </div>
                                <h3 className="album-title">{album.name}</h3>
                                <p className="album-year">
                                    {album.release_date ? new Date(album.release_date * 1000).getFullYear() : ""}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            
            {/* Popup biographie */}
            {showBioPopup && (
                <div className="bio-popup-overlay" onClick={closeBioPopup}>
                    <div className="bio-popup" onClick={(e) => e.stopPropagation()}>
                        <button className="close-popup" onClick={closeBioPopup}>
                            <i className="fas fa-times"></i>
                        </button>
                        <div className="popup-header">
                            <h2>À propos de {artist.name}</h2>
                        </div>
                        <div className="popup-content">
                            <div className="artist-popup-photo-container">
                                <img 
                                    src={artist.photo} 
                                    alt={artist.name} 
                                    className="artist-popup-photo"
                                    onError={(e) => {
                                        e.target.src = 'https://i.scdn.co/image/ab6761610000e5eb1020c22e0ce742eca7166c3b';
                                    }}
                                />
                            </div>
                            <div className="artist-full-bio">
                                <p>{artist.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ArtistDetailPage;