import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import About from "../../pages/About";
import Home from "../../pages/Home";
import MusicPlayer from "../../pages/MusicPlayer";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Logout from "../../pages/Logout";
import List from "../../pages/List";
import Upload from "../../pages/Upload";

import "./Header.css";
import ProtectedRoutes from "../ProtectedRoutes";

function Header() {
  return (
    <BrowserRouter>
      <header className="header-container">
        <Nav />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/musicplayer" element={<MusicPlayer />} />
            <Route path="/song" element={<List />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default Header;
