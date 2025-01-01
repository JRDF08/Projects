import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import { useAuth } from "../components/Context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/SoundScape/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.accessToken, data.refreshToken);
        navigate("/musicplayer");
      } else {
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError(
        "An error occurred while communicating with the server. Please try again.",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const videoBgOne =
    "https://res.cloudinary.com/dz9idilfa/video/upload/v1731655560/home-background_ainbfr.mp4";

  return (
    <div className="background-video">
      <video src={videoBgOne} autoPlay loop muted />

      <div className="content">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" />
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="login-button">
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
