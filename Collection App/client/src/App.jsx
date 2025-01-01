import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import AddCard from "./components/AddCard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add-card" element={<AddCard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
