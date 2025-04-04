import React, { useState, useEffect, useRef } from 'react';
import './AudioPlayer.css';

function AudioPlayer({ 
  currentTrack, 
  isPlaying, 
  setIsPlaying, 
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (currentTrack && isPlaying) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentTrack, isPlaying]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    const progressBar = progressRef.current;
    const clickPosition = (e.clientX - progressBar.offsetLeft) / progressBar.offsetWidth;
    const newTime = clickPosition * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      e.target.style.setProperty('--volume-percentage', `${newVolume * 100}%`);
    }
  };

  const getVolumeIcon = () => {
    if (volume == 0) return 'fa-volume-mute';
    if (volume < 0.3) return 'fa-volume-off';
    if (volume < 0.7) return 'fa-volume-down';
    return 'fa-volume-up';
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-player">
      <div className="player-left">
        <img 
          src={currentTrack.albumCover} 
          alt="Album cover" 
          className="player-album-cover"
        />
        <div className="track-info">
          <p className="track-name">{currentTrack.name}</p>
          <p className="track-artist">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button 
            className={`control-button ${!hasPrevious ? 'disabled' : ''}`}
            onClick={onPrevious}
            disabled={!hasPrevious}
          >
            <i className="fas fa-step-backward"></i>
          </button>
          <button className="control-button play" onClick={togglePlay}>
            {isPlaying ? 
              <i className="fas fa-pause"></i> : 
              <i className="fas fa-play"></i>
            }
          </button>
          <button 
            className={`control-button ${!hasNext ? 'disabled' : ''}`}
            onClick={onNext}
            disabled={!hasNext}
          >
            <i className="fas fa-step-forward"></i>
          </button>
        </div>
        
        <div className="progress-container">
          <span className="time">{formatTime(currentTime)}</span>
          <div 
            className="progress-bar" 
            ref={progressRef}
            onClick={handleProgressClick}
          >
            <div 
              className="progress" 
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="time">{formatTime(duration)}</span>
        </div>

        <audio
          ref={audioRef}
          src={currentTrack.mp3}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={onNext}
        />
      </div>

      <div className="player-right">
        <div className="volume-control">
          <button 
            className="volume-button"
            onClick={() => setIsVolumeOpen(!isVolumeOpen)}
          >
            <i className={`fas ${getVolumeIcon()}`}></i>
          </button>
          <div className={`volume-slider ${isVolumeOpen ? 'active' : ''}`}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-range"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;