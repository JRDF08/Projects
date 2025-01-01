import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCard = () => {
  const [formData, setFormData] = useState({
    cardName: "",
    cardClass: "",
    cardSeries: "",
    cardLife: "",
    cardCost: "",
    cardAttribute: "",
    cardPower: "",
    cardCounter: "",
    cardColor: "",
    cardType: "",
    cardEffect: "",
    cardSet: "",
    cardImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, cardImage: e.target.files[0] });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);

        setFormData({
          cardName: "",
          cardClass: "",
          cardSeries: "",
          cardLife: "",
          cardCost: "",
          cardAttribute: "",
          cardPower: "",
          cardCounter: "",
          cardColor: "",
          cardType: "",
          cardEffect: "",
          cardSet: "",
          cardImage: null,
        });
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create a Card</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Name
          </label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card name"
          />
        </div>
        {/* Card Class */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Class
          </label>
          <input
            type="text"
            name="cardClass"
            value={formData.cardClass}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card class"
          />
        </div>
        {/* Card Series */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Series
          </label>
          <input
            type="text"
            name="cardSeries"
            value={formData.cardSeries}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card series"
          />
        </div>
        {/* Card Life */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Life
          </label>
          <input
            type="text"
            name="cardLife"
            value={formData.cardLife}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card life"
          />
        </div>
        {/* Card Cost */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Cost
          </label>
          <input
            type="text"
            name="cardCost"
            value={formData.cardCost}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card cost"
          />
        </div>
        {/* Card Attribute */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Attribute
          </label>
          <input
            type="text"
            name="cardAttribute"
            value={formData.cardAttribute}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card attribute"
          />
        </div>
        {/* Other Fields */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Power
          </label>
          <input
            type="text"
            name="cardPower"
            value={formData.cardPower}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card power"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Counter
          </label>
          <input
            type="text"
            name="cardCounter"
            value={formData.cardCounter}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card counter"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Color
          </label>
          <input
            type="text"
            name="cardColor"
            value={formData.cardColor}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card color"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Type
          </label>
          <input
            type="text"
            name="cardType"
            value={formData.cardType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card type"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Effect
          </label>
          <textarea
            name="cardEffect"
            value={formData.cardEffect}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card effect"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Set
          </label>
          <input
            type="text"
            name="cardSet"
            value={formData.cardSet}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card set"
          />
        </div>
        {/* Upload Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Upload Card Image
          </label>
          <input
            type="file"
            accept="image/*"
            name="cardImage"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        {/* Submit and Cancel Button */}
        <div className="text-center space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Submit
          </button>
          <button
            type="submit"
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCard;
