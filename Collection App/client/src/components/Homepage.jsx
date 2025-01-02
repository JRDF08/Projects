import { Link } from "react-router-dom";

import CardContainer from "./CardContainer.jsx";

const Homepage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Home Page</h1>

      <Link to="/add-card">
        <button>Add Card</button>
      </Link>

      <CardContainer />
    </>
  );
};

export default Homepage;
