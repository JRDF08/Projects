import { useState, useRef } from "react";
import { music } from "../components/music";
import Player from "./Player";
import "./MusicPlayer.css";

function MusicPlayer() {
  const [songs] = useState(music);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playerRef = useRef(null);

  const nextSong = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prevSong = () => {
    const musicRef = playerRef.current.getAudioElement();

    if (currentIndex === 0 && !musicRef.paused) {
      musicRef.currentTime = 0;
      musicRef.play();
    } else if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <div className="musicPlayer-main">
      <Player
        ref={playerRef}
        currentSong={songs[currentIndex]}
        nextSong={nextSong}
        prevSong={prevSong}
      />
    </div>
  );
}

export default MusicPlayer;
