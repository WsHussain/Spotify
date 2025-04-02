import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './AlbumPage.css';

function AlbumPage() {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [error, setError] = useState(null);
  const [playingTrack, setPlayingTrack] = useState(null);
  const audioRefs = useRef({});

  useEffect(() => {
    fetch(`http://localhost:8000/albums/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => setAlbumData(data))
      .catch(error => setError(error.message));
  }, [id]);

  const handlePlayPause = (trackId) => {
    const audio = audioRefs.current[trackId];
    
    if (playingTrack === trackId) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      if (playingTrack) {
        audioRefs.current[playingTrack].pause();
      }
      audio.play();
      setPlayingTrack(trackId);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!albumData) return <div>Loading...</div>;

  const { album, tracks } = albumData;

  return (
    <div className="album-page">
      <div className="album-header">
        <img 
          src={album.cover}
          alt={`Cover de ${album.name}`}
          className="album-cover-img"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300';
          }}
        />
        <div className="album-info">
          <h1>{album.name}</h1>
          <p className="album-description">{album.description}</p>
        </div>
      </div>
      
      <ul className="tracks-list">
        {tracks.map(track => (
          <li key={track.id} className="track-item">
            <button 
              className="play-button"
              onClick={() => handlePlayPause(track.id)}
            >
              {playingTrack === track.id ? '⏸️' : '▶️'}
            </button>
            <span className="track-number">{track.track_no}</span>
            <span className="track-name">{track.name}</span>
            <span className="track-duration">
              {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
            </span>
            <audio 
              ref={el => audioRefs.current[track.id] = el}
              controls
              className="track-player"
              src={track.mp3}
              onEnded={() => setPlayingTrack(null)}
            >
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumPage;