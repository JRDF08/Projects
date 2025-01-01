import { Link } from "react-router-dom";

import { useTheme } from "../Context/ThemeContext.jsx";
import { useAuth } from "../Context/AuthContext.jsx";
import Logo from "./Logo";

function Nav() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Logo theme={theme} setTheme={setTheme} />

      <div className="nav-container">
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/musicplayer">Music Player</Link>
            <Link to="/song">Songs</Link>
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <Link to="/about">About</Link>
        )}
      </div>
    </>
  );
}

export default Nav;
