import { ThemeProvider } from "../Context/ThemeContext.jsx";
import { AuthProvider } from "../Context/AuthContext.jsx";
import AppContent from "./AppContent";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
