import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCard = () => {
  const [formData, setFormData] = useState({
    cardName: "",
    cardClass: "",
    cardNumber: "",
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
          cardNumber: "",
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
        toast.success("Card created successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "Failed to create card"}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error("Request failed. Please try again later.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
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
        {/* Card Rarity */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Rarity
          </label>
          <select
            name="cardRarity"
            value={formData.cardRarity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Select card rarity</option>
            <option value="L">Leader</option>
            <option value="C">Common</option>
            <option value="UC">Uncommon</option>
            <option value="R">Rare</option>
            <option value="SR">Super Rare</option>
            <option value="SEC">Secret Rare</option>
          </select>
        </div>
        {/* Card Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card number"
          />
        </div>
        {/* Card Role */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Role
          </label>
          <select
            name="cardRole"
            value={formData.cardRole}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Select card role</option>
            <option value="Leader">Leader</option>
            <option value="Character">Character</option>
            <option value="Stage">Stage</option>
            <option value="Event">Event</option>
          </select>
        </div>
        {formData.cardRole === "Leader" ? (
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
        ) : (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Card Cost
            </label>
            <select
              name="cardCost"
              value={formData.cardCost}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter card cost"
            >
              <option value="">Select card cost</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        )}

        {formData.cardRole !== "Leader" && formData.cardRole !== "Event" && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Card Counter
            </label>
            <select
              name="cardCounter"
              value={formData.cardCounter}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter card counter"
            >
              <option value="">Select card counter</option>
              <option value="1000">1000</option>
              <option value="2000">2000</option>
            </select>
          </div>
        )}

        {formData.cardRole !== "Event" && (
          <>
            {/* Card Attribute */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Card Attribute
              </label>
              <select
                name="cardAttribute"
                value={formData.cardAttribute}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Select card attribute</option>
                <option value="Slash">Slash</option>
                <option value="Strike">Strike</option>
                <option value="Ranged">Ranged</option>
                <option value="Special">Special</option>
                <option value="Wisdom">Wisdom</option>
              </select>
            </div>
            {/* Other Fields */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Card Power
              </label>
              <select
                name="cardPower"
                value={formData.cardPower}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter card power"
              >
                <option value="">Select card power</option>
                <option value="1000">1000</option>
                <option value="2000">2000</option>
                <option value="3000">3000</option>
                <option value="4000">4000</option>
                <option value="5000">5000</option>
                <option value="6000">6000</option>
                <option value="7000">7000</option>
                <option value="8000">8000</option>
                <option value="9000">9000</option>
                <option value="10000">10000</option>
                <option value="11000">11000</option>
                <option value="12000">12000</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Card Color
          </label>
          <select
            name="cardColor"
            value={formData.cardColor}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card color"
          >
            <option value="">Select card color</option>
            <option value="Red">Red</option>
            <option value="Green">Green</option>
            <option value="Blue">Blue</option>
            <option value="Purple">Purple</option>
            <option value="Black">Black</option>
            <option value="Yellow">Yellow</option>
            <option value="Red/Green">Red/Green</option>
            <option value="Blue/Purple">Blue/Purple</option>
          </select>
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
          <select
            name="cardSet"
            value={formData.cardSet}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter card set"
          >
            <option value="">Select card set</option>
            <option value="-ROMANCE DAWN- [OP-01]">
              -ROMANCE DAWN- [OP-01]
            </option>
            <option value="-Paramount War- [OP-02]">
              -Paramount War- [OP-02]
            </option>
          </select>
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
        </div>
      </form>

      <button
        type="submit"
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Cancel
      </button>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AddCard;
