/* eslint-disable */
import {
  useReducer,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./MusicPlayer.css";
import {
  MdOutlinePlayCircleFilled,
  MdPauseCircle,
  MdSkipPrevious,
  MdSkipNext,
} from "react-icons/md";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? `0${minutes}` : minutes} : ${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};

// Initial state
const initialState = {
  isPlaying: false,
  audioDuration: 0,
  musicTotalLength: "00 : 00",
  musicCurrentTime: "00 : 00",
  videoIndex: parseInt(localStorage.getItem("videoIndex")) || 0,
};

// Reducer function
function playerReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_PLAY":
      return { ...state, isPlaying: !state.isPlaying };
    case "SET_DURATION":
      return { ...state, audioDuration: action.payload };
    case "SET_TOTAL_LENGTH":
      return { ...state, musicTotalLength: action.payload };
    case "SET_CURRENT_TIME":
      return { ...state, musicCurrentTime: action.payload };
    case "NEXT_VIDEO":
      return { ...state, videoIndex: (state.videoIndex + 1) % action.payload };
    default:
      return state;
  }
}

const Player = forwardRef(function PlayerComponent(
  { currentSong, nextSong, prevSong },
  ref
) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const musicRef = useRef(null);

  const videoSeven =
    "https://res.cloudinary.com/dz9idilfa/video/upload/v1731656130/musicplayer-bg-001_oi4dtg.mp4";
  const videoThree =
    "https://res.cloudinary.com/dz9idilfa/video/upload/v1731656129/musicplayer-bg-002_kdzw9n.mp4";
  const videoFour =
    "https://res.cloudinary.com/dz9idilfa/video/upload/v1731656122/musicplayer-bg-003_yl1ttk.mp4";
  const videoFive =
    "https://res.cloudinary.com/dz9idilfa/video/upload/v1731656125/musicplayer-bg-004_ljpx5p.mp4";
  const videoSix =
    "https://res.cloudinary.com/dz9idilfa/video/upload/v1731656132/musicplayer-bg-005_gkoaqz.mp4";

  const vidArray = [videoSeven, videoThree, videoFour, videoFive, videoSix];

  // Expose musicRef to parent component
  useImperativeHandle(ref, () => ({
    getAudioElement: () => musicRef.current,
  }));

  const handleMusicDurationBar = (event) => {
    const value = event.target.value;
    dispatch({ type: "SET_DURATION", payload: value });
    if (musicRef.current) {
      musicRef.current.currentTime = (value * musicRef.current.duration) / 100;
    }
  };

  useEffect(() => {
    const handleMetadataLoaded = () => {
      const duration = musicRef.current.duration;
      dispatch({ type: "SET_TOTAL_LENGTH", payload: formatTime(duration) });

      musicRef.current.currentTime = 0;
      dispatch({ type: "SET_CURRENT_TIME", payload: "00 : 00" });
      dispatch({ type: "SET_DURATION", payload: 0 });

      if (state.isPlaying) {
        musicRef.current.play();
      }
    };

    const handleTimeUpdate = () => {
      const currentTime = musicRef.current.currentTime;
      dispatch({ type: "SET_CURRENT_TIME", payload: formatTime(currentTime) });
      dispatch({
        type: "SET_DURATION",
        payload: (currentTime / musicRef.current.duration) * 100,
      });
    };

    const handleSongEnd = () => {
      handleSongEnd();
    };

    const currentMusic = musicRef.current;
    currentMusic.addEventListener("loadedmetadata", handleMetadataLoaded);
    currentMusic.addEventListener("timeupdate", handleTimeUpdate);
    currentMusic.addEventListener("ended", handleSongEnd);

    return () => {
      currentMusic.removeEventListener("loadedmetadata", handleMetadataLoaded);
      currentMusic.removeEventListener("timeupdate", handleTimeUpdate);
      currentMusic.removeEventListener("ended", handleSongEnd);
    };
  }, [currentSong, state.isPlaying, nextSong]);

  const togglePlay = () => {
    if (state.isPlaying) {
      musicRef.current.pause();
    } else {
      musicRef.current.play().catch((error) => {
        console.error("Autoplay failed or user interaction needed:", error);
      });
    }
    dispatch({ type: "TOGGLE_PLAY" });
  };

  useEffect(() => {
    if (currentSong && musicRef.current) {
      console.log("Audio URL:", currentSong.audioUrl);
      musicRef.current.src = currentSong.audioUrl;
      musicRef.current.load();
    }
  }, [currentSong]);

  useEffect(() => {
    localStorage.setItem("videoIndex", state.videoIndex);
  }, [state.videoIndex]);

  return (
    <div>
      <audio ref={musicRef} onEnded={nextSong}></audio>

      <div className="player-main">
        <video
          src={vidArray[state.videoIndex]}
          autoPlay
          muted
          loop
          className="backgroundVideo"
        ></video>
        <div className="blackScreen"></div>
        <div className="player-card">
          {currentSong && (
            <div>
              <h4>{currentSong.title}</h4>
              <img
                src={currentSong.imageUrl}
                alt="Song Avatar"
                id="songAvatar"
              />
              <h4>{currentSong.artist}</h4>
            </div>
          )}
          <div className="musicTimerDiv">
            <p className="musicCurrentTime">{state.musicCurrentTime}</p>
            <p className="musicEndTime">{state.musicTotalLength}</p>
          </div>

          <input
            type="range"
            name="musicProgressBar"
            className="musicProgressBar"
            value={state.audioDuration}
            onChange={handleMusicDurationBar}
          />

          <div className="player-controls">
            <MdSkipPrevious
              size={50}
              className="player-icons"
              onClick={prevSong}
            />
            {state.isPlaying ? (
              <MdPauseCircle
                size={60}
                className="player-icons"
                onClick={togglePlay}
              />
            ) : (
              <MdOutlinePlayCircleFilled
                size={60}
                className="player-icons"
                onClick={togglePlay}
              />
            )}
            <MdSkipNext size={50} className="player-icons" onClick={nextSong} />
          </div>
        </div>
        <div
          className="changeBgButton"
          onClick={() =>
            dispatch({ type: "NEXT_VIDEO", payload: vidArray.length })
          }
        >
          Change Background
        </div>
      </div>
    </div>
  );
});

export default Player;
