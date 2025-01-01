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
    "https://videos.pexels.com/video-files/3512232/3512232-hd_1920_1080_24fps.mp4";
  const videoThree =
    "https://videos.pexels.com/video-files/2762297/2762297-hd_1920_1080_30fps.mp4";
  const videoFour =
    "https://videos.pexels.com/video-files/6252550/6252550-hd_1920_1080_30fps.mp4";
  const videoFive =
    "https://videos.pexels.com/video-files/2225332/2225332-hd_1920_1080_25fps.mp4";
  const videoSix =
    "https://videos.pexels.com/video-files/5197762/5197762-uhd_2560_1440_25fps.mp4";

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
      if (musicRef.current.currentTime >= musicRef.current.duration) {
        nextSong();
      }
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
      musicRef.current.play();
    }
    dispatch({ type: "TOGGLE_PLAY" });
  };

  useEffect(() => {
    if (currentSong) {
      musicRef.current.src = currentSong.music;
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
              <h4>{currentSong.name}</h4>
              <img src={currentSong.avatar} alt="Song Avatar" id="songAvatar" />
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
