import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import About from "../../pages/About";
import Home from "../../pages/Home";
import MusicPlayer from "../../pages/MusicPlayer";
import "./Header.css";

function Header({ theme, setTheme }) {
  return (
    <>
      <BrowserRouter>
        <header className="header-container">
          <Nav theme={theme} setTheme={setTheme} />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/musicplayer" element={<MusicPlayer />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default Header;
