import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';
import './AlbumPage.css';

function AlbumPage() {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/albums/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => setAlbumData(data))
      .catch(error => setError(error.message));
  }, [id]);

  const handlePlayPause = (track) => {
    if (currentTrack && currentTrack.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack({
        ...track,
        albumCover: albumData.album.cover,
        album: albumData.album.name,
        artist: albumData.album.artist // Ajout de l'artiste
      });
      setIsPlaying(true);
    }
  };

  const handlePlayAlbum = () => {
    if (tracks && tracks.length > 0) {
      const firstTrack = tracks[0];
      setCurrentTrack({
        ...firstTrack,
        albumCover: album.cover,
        album: album.name,
        artist: album.artist // Ajout de l'artiste
      });
      setIsPlaying(true);
    }
  };

  const getCurrentTrackIndex = () => {
    return tracks.findIndex(track => track.id === currentTrack?.id);
  };

  const handleNext = () => {
    const currentIndex = getCurrentTrackIndex();
    if (currentIndex < tracks.length - 1) {
      const nextTrack = tracks[currentIndex + 1];
      setCurrentTrack({
        ...nextTrack,
        albumCover: album.cover,
        album: album.name
      });
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentTrackIndex();
    if (currentIndex > 0) {
      const previousTrack = tracks[currentIndex - 1];
      setCurrentTrack({
        ...previousTrack,
        albumCover: album.cover,
        album: album.name
      });
      setIsPlaying(true);
    }
  };

  const handleTrackClick = (track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack({
        ...track,
        albumCover: album.cover,
        album: album.name
      });
      setIsPlaying(true);
    }
  };

  const renderPlayButton = (track) => {
    const isCurrentTrack = currentTrack?.id === track.id;
    const isThisPlaying = isCurrentTrack && isPlaying;

    return (
      <button 
        className={`track-play-button ${isCurrentTrack ? 'active' : ''}`}
        onClick={() => handlePlayPause(track)}
      >
        <i className={`fas ${isThisPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        <span className="track-number">
          {isCurrentTrack ? <i className="fas fa-volume-up"></i> : track.track_no}
        </span>
      </button>
    );
  };

  if (error) return <div className="error-message">Error: {error}</div>;
  if (!albumData) return <div className="loading-message">Loading...</div>;

  const { album, tracks } = albumData;

  return (
    <div className="album-page">
      <div className="album-header">
        <div className="album-cover-container">
          <img 
            src={album.cover}
            alt={`Cover de ${album.name}`}
            className="album-cover-img"
            onError={(e) => {
              console.log('Image not found, setting placeholder');
            }}
          />
          <button 
            className="header-play-button"
            onClick={handlePlayAlbum}
          >
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>
        </div>
        <div className="album-info">
          <span className="album-type">Album</span>
          <h1>{album.name}</h1>
          <p className="album-description">{album.description}</p>
        </div>
      </div>
      
      <ul className="tracks-list">
        {tracks.map((track, index) => (
          <li 
            key={track.id} 
            className={`track-item ${currentTrack?.id === track.id ? 'playing' : ''}`}
            onClick={() => handleTrackClick(track)}
          >
            <span className="track-number">
              {currentTrack?.id === track.id ? 
                <i className="fas fa-volume-up"></i> : 
                (index + 1).toString().padStart(2, '0')}
            </span>
            <div className="track-info">
              <span className="track-name">{track.name}</span>
            </div>
            <span className="track-duration">
              {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
            </span>
          </li>
        ))}
      </ul>

      {currentTrack && (
        <AudioPlayer 
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onNext={handleNext}
          onPrevious={handlePrevious}
          hasNext={getCurrentTrackIndex() < tracks.length - 1}
          hasPrevious={getCurrentTrackIndex() > 0}
          onClose={() => {
            setCurrentTrack(null);
            setIsPlaying(false);
          }}
        />
      )}
    </div>
  );
}

export default AlbumPage;