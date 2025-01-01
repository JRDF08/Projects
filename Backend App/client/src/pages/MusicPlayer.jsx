/* eslint-disable */
import { useState, useRef, useEffect } from "react";
import Player from "./Player";
import "./MusicPlayer.css";

function MusicPlayer() {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playerRef = useRef(null);

  const API_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/SoundScape/api/musicplayer/list`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("Fetched songs:", data);
        const activeSongs = data.filter((song) => !song.isDeleted);
        setSongs(activeSongs);
      } catch (error) {
        console.error("Error fetching music data:", error);
      }
    };

    fetchMusicData();
  }, []);

  const nextSong = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  if (songs.length === 0) {
    return <div>Loading...</div>;
  }

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
