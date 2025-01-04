import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import AddCard from "./components/AddCard";
import CardPage from "./components/CardPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add-card" element={<AddCard />} />
        <Route path="/:number" element={<CardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
