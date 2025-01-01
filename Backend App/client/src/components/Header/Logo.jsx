import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext.jsx";

import { FaMusic } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { useContext } from "react";

function Logo() {
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const toggleMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="logo">
        <FaMusic />
        <a onClick={goToHome}>SoundScape</a>

        {theme === "light" ? (
          <CiDark onClick={toggleMode} />
        ) : (
          <MdLightMode onClick={toggleMode} />
        )}
      </div>
    </>
  );
}

export default Logo;
