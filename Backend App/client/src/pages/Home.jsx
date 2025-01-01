import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";
import "./Home.css";

function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const videoBgOne =
    "https://res.cloudinary.com/dz9idilfa/video/upload/v1731655560/home-background_ainbfr.mp4";

  const goToLoginPage = () => {
    navigate("/login");
  };

  const goToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <div className="background-video">
      <video src={videoBgOne} autoPlay loop muted />
      {isAuthenticated ? (
        <div className="content">
          <h1>Welcome to SoundScape!</h1>
        </div>
      ) : (
        <div className="content">
          <h1>Welcome to SoundScape!</h1>
          <p onClick={goToLoginPage}>Start Listening Music</p>
          <p onClick={goToRegisterPage}>Register</p>
        </div>
      )}
    </div>
  );
}

export default Home;
