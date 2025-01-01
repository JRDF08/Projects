import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const videoBgOne =
    "https://videos.pexels.com/video-files/4088191/4088191-hd_1920_1080_25fps.mp4";

  const goToMusicPlayer = () => {
    navigate("/musicplayer");
  };

  return (
    <div className="background-video">
      <video src={videoBgOne} autoPlay loop muted />

      <div className="content">
        <h1>Welcome to SoundScape!</h1>
        <p onClick={goToMusicPlayer}>Start Listening Music</p>
      </div>
    </div>
  );
}

export default Home;
