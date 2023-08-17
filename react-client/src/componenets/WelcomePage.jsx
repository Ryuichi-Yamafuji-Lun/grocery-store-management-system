import { useState } from 'react';
import pikachu from '../assets/pokemon-sprites/Pokemon/pikachu.gif';
import music from '../assets/audio/pokestore.mp3';

const WelcomePage = () => {
  const [isAudioPlayed, setIsAudioPlayed] = useState(false);

  const playAudio = () => {
    if (!isAudioPlayed) {
      const audio = new Audio(music);
      audio.play();
      setIsAudioPlayed(true);
    }
  };

  return (
    <div className="welcome-page flex flex-col justify-center items-center h-screen bg-blue-800">
      <div className="max-w-[1000px] mx-auto px-8 text-center">
        <div className="flex items-center justify-center md:justify-start mb-4">
          <h1 className="text-4xl sm:text-7xl font-bold text-white">Welcome</h1>
          <img
            src={pikachu}
            alt="Pikachu"
            className={`w-1/4 md:w-1/6 ml-4 ${isAudioPlayed ? 'animate-bounce' : ''}`}
            onClick={playAudio}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <p className="text-2xl py-2 max-w-[700px] text-white">PokéStore Management System</p>
        <p className="text-white">Made with React, mySQL, and Flask</p>
      </div>
    </div>
  )
}

export default WelcomePage
