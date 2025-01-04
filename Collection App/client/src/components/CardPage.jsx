import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// import CardContainer from "./CardContainer";
import {
  specialLogo,
  rangedLogo,
  wisdomLogo,
  slashLogo,
  strikeLogo,
} from "../utils/attributeLogo.js";

const CardPage = () => {
  const { number } = useParams();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const fetchCardByNumber = async (cardNumber) => {
    try {
      console.log("Fetching cards with number:", cardNumber);
      const url = `http://localhost:3000/card/list?number=${cardNumber}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCards(data);
        if (data.length > 0) {
          setSelectedCard(data[0]);
          setShowModal(true);
        }
      } else {
        console.error("Failed to fetch cards");
      }
    } catch (error) {
      console.error("Error fetching cards by number:", error);
    }
  };

  useEffect(() => {
    if (number) {
      fetchCardByNumber(number);
    }
  }, [number]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCard(null);
    navigate("/");
  };

  const adjustCardNumber = (cardNumber, increment = 1) => {
    const prefix = cardNumber.slice(0, 5);
    const numberPart = parseInt(cardNumber.slice(5), 10);
    const newNumber = (numberPart + increment).toString().padStart(3, "0");
    return `${prefix}${newNumber}`;
  };

  const prevCard = () => {
    if (selectedCard) {
      const newCardNumber = adjustCardNumber(selectedCard.cardNumber, -1);
      navigate(`/${newCardNumber}`);
    }
  };

  const nextCard = () => {
    if (selectedCard) {
      const newCardNumber = adjustCardNumber(selectedCard.cardNumber, 1);
      navigate(`/${newCardNumber}`);
    }
  };

  return (
    <>
      {selectedCard ? (
        <>
          {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-50">
              <div className="flex justify-between mt-4 mr-4">
                <button
                  onClick={prevCard}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  Previous
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-lg">
                <div className="bg-black text-white flex flex-col items-center justify-center p-4 rounded-t-lg">
                  <h3>{`${selectedCard.cardNumber} | ${selectedCard.cardRarity} | ${selectedCard.cardRole}`}</h3>
                  <h2 className="text-2xl font-bold mt-2">
                    {selectedCard.cardName}
                  </h2>
                </div>

                <div className="flex items-center p-6 space-x-6">
                  <img
                    src={selectedCard.cardImage.imageUrl}
                    alt={selectedCard.cardName}
                    className="max-w-[600px] max-h-[600px] object-contain rounded-md"
                  />
                  <div className="flex flex-col space-y-4 max-w-[400px]">
                    <div className="mt-4 bg-gray-100 p-2 flex justify-between">
                      <div className="flex flex-col space-y-4 w-full">
                        <div className="flex justify-start">
                          {selectedCard.cardLife !== 0 &&
                            selectedCard.cardLife !== null && (
                              <>
                                <strong>Life</strong>
                                <span className="ml-4">
                                  {selectedCard.cardLife}
                                </span>
                              </>
                            )}
                          {(selectedCard.cardLife === 0 ||
                            selectedCard.cardLife === null) && (
                            <>
                              <strong>Cost</strong>
                              <span className="ml-4">
                                {selectedCard.cardCost}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex justify-start">
                          <strong>Power</strong>
                          <span className="ml-4">
                            {selectedCard.cardPower !== 0 &&
                            selectedCard.cardPower !== null
                              ? selectedCard.cardPower
                              : "-"}
                          </span>
                        </div>

                        <div className="flex justify-start">
                          <strong>Color</strong>
                          <span className="ml-4">{selectedCard.cardColor}</span>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-4 w-full">
                        <div className="flex justify-start items-center">
                          <strong>Attribute</strong>
                          <span className="ml-2 flex items-center">
                            {selectedCard.cardAttribute &&
                            selectedCard.cardAttribute !== null ? (
                              <>
                                {selectedCard.cardAttribute === "Special" && (
                                  <img
                                    src={specialLogo}
                                    alt="cardAttribute"
                                    className="ml-2 h-6"
                                  />
                                )}
                                {selectedCard.cardAttribute === "Ranged" && (
                                  <img
                                    src={rangedLogo}
                                    alt="cardAttribute"
                                    className="ml-2 h-6"
                                  />
                                )}
                                {selectedCard.cardAttribute === "Wisdom" && (
                                  <img
                                    src={wisdomLogo}
                                    alt="cardAttribute"
                                    className="ml-2 h-6"
                                  />
                                )}
                                {selectedCard.cardAttribute === "Slash" && (
                                  <img
                                    src={slashLogo}
                                    alt="cardAttribute"
                                    className="ml-2 h-6"
                                  />
                                )}
                                {selectedCard.cardAttribute === "Strike" && (
                                  <img
                                    src={strikeLogo}
                                    alt="cardAttribute"
                                    className="ml-2 h-6"
                                  />
                                )}
                                <div className="ml-2">
                                  {selectedCard.cardAttribute}
                                </div>
                              </>
                            ) : (
                              "-"
                            )}
                          </span>
                        </div>

                        <div className="flex justify-start">
                          <strong>Counter</strong>
                          <span className="ml-4">
                            {selectedCard.cardCounter !== 0 &&
                            selectedCard.cardCounter !== null
                              ? selectedCard.cardCounter
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 bg-gray-100 p-2">
                      <strong>Type</strong>
                      <p>{selectedCard.cardType}</p>
                    </div>
                    <div className="mt-4 bg-gray-100 p-2 min-w-[400px]">
                      <strong>Effect</strong>
                      <p>
                        {selectedCard.cardEffect !== ""
                          ? selectedCard.cardEffect
                          : "-"}
                      </p>
                    </div>
                    <div className="mt-4 bg-gray-100 p-2">
                      <strong>Card Set(s)</strong>
                      <p>{selectedCard.cardSet}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleCloseModal}
                    className="bg-red-500 text-white py-2 px-6 mb-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="flex justify-between mt-4 ml-4">
                <button
                  onClick={nextCard}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>No card found</p>
      )}
    </>
  );
};

export default CardPage;
