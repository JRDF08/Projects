import { Link } from "react-router-dom";

import CardContainer from "./CardContainer.jsx";

const Homepage = () => {
  return (
    <>
      <div>
        <Link to="/add-card">
          <button>Add Card</button>
        </Link>
      </div>

      <div>
        <Link to="/tracker">
          <button>Tracker</button>
        </Link>
      </div>

      <CardContainer />
    </>
  );
};

export default Homepage;
