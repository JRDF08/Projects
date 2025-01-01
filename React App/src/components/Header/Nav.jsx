import { Link } from "react-router-dom";
import Logo from "./Logo";

function Nav({ theme, setTheme }) {
  return (
    <>
      <Logo theme={theme} setTheme={setTheme} />

      <div className="nav-container">
        <Link to="/">Home</Link>
        <Link to="/musicplayer">Music Player</Link>
        <Link to="/about">About</Link>
      </div>
    </>
  );
}

export default Nav;
