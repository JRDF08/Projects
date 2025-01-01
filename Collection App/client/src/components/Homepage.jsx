import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Home Page</h1>

      <Link to="/add-card">
        <button>Add Card</button>
      </Link>
    </>
  );
};

export default Homepage;
