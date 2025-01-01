import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext.jsx";

function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`container ${theme}`}>
      <Header />
      <Footer />
    </div>
  );
}

export default AppContent;
