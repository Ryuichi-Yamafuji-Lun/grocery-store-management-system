import { useState, useEffect } from 'react';
import music from '../assets/audio/pokestore.mp3';

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Set initial value to true

  useEffect(() => {
    const audioElement = new Audio(music);
    audioElement.loop = true;
    audioElement.muted = isMuted;
    audioElement.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(error => {
        setIsPlaying(false);
        console.error('Error playing audio:', error);
      });

    return () => {
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="audio-player">
      <button className={`mute-button ${isMuted ? 'muted' : ''}`} onClick={toggleMute}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
      {!isPlaying && (
        <button className="play-button" onClick={() => setIsPlaying(true)}>
          Play
        </button>
      )}
    </div>
  )
}

export default AudioPlayer
