import { useNavigate } from "react-router-dom";

import { FaMusic } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";

function Logo({ theme, setTheme }) {
  const toggleMode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const navigate = useNavigate();

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
