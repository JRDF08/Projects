import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";

function App() {
  const currentTheme = localStorage.getItem("currentTheme");
  const [theme, setTheme] = useState(currentTheme ? currentTheme : "light");

  useEffect(() => {
    localStorage.setItem("currentTheme", theme);
  }, [theme]);

  return (
    <>
      <div className={`container ${theme}`}>
        <Header theme={theme} setTheme={setTheme} />
        <Footer theme={theme} setTheme={setTheme} />
      </div>
    </>
  );
}

export default App;
