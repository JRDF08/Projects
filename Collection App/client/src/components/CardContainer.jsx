import { useState, useEffect } from "react";

const CardContainer = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCard(null);
  };

  const prevCard = () => {
    setSelectedCard((prev) => {
      const currentIndex = cards.indexOf(prev);
      const nextIndex =
        currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
      return cards[nextIndex];
    });
  };

  const nextCard = () => {
    setSelectedCard((prev) => {
      const currentIndex = cards.indexOf(prev);
      const nextIndex =
        currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
      return cards[nextIndex];
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/card/list", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        setCards(data);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Request Failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(cards);

  const specialLogo =
    "https://res.cloudinary.com/dz9idilfa/image/upload/v1735831566/special_bkv86o.png";
  const rangedLogo =
    "https://res.cloudinary.com/dz9idilfa/image/upload/v1735831566/ranged_ezrj0a.png";
  const wisdomLogo =
    "https://res.cloudinary.com/dz9idilfa/image/upload/v1735831566/wisdom_ibzke9.png";
  const slashLogo =
    "https://res.cloudinary.com/dz9idilfa/image/upload/v1735831566/slash_hab0wf.png";
  const strikeLogo =
    "https://res.cloudinary.com/dz9idilfa/image/upload/v1735831565/strike_xkuppb.png";

  return (
    <div className="w-full mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Card List
      </h1>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-full max-h-[calc(100vh-100px)] overflow-y-auto mx-auto"
        style={{ maxHeight: "800px" }}
      >
        {cards.length > 0 ? (
          cards.slice(0, 20).map((card, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(card)}
              className="p-2 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 flex flex-col items-center transform hover:translate-y-[-10px]"
            >
              <div className="flex items-center justify-center w-full h-full">
                <img
                  src={card.cardImage.imageUrl}
                  alt={card.cardName}
                  className="w-full h-auto object-contain rounded-md"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No cards available.
          </p>
        )}
      </div>

      {/* Modal */}
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
                          <span className="ml-4">{selectedCard.cardCost}</span>
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
                        {selectedCard.cardAttribute === "Special" && (
                          <img
                            src={specialLogo}
                            alt="Special"
                            className="ml-2 h-6"
                          />
                        )}
                        {selectedCard.cardAttribute === "Ranged" && (
                          <img
                            src={rangedLogo}
                            alt="Ranged"
                            className="ml-2 h-6"
                          />
                        )}
                        {selectedCard.cardAttribute === "Wisdom" && (
                          <img
                            src={wisdomLogo}
                            alt="Wisdom"
                            className="ml-2 h-6"
                          />
                        )}
                        {selectedCard.cardAttribute === "Slash" && (
                          <img
                            src={slashLogo}
                            alt="Slash"
                            className="ml-2 h-6"
                          />
                        )}
                        {selectedCard.cardAttribute === "Strike" && (
                          <img
                            src={strikeLogo}
                            alt="Strike"
                            className="ml-2 h-6"
                          />
                        )}
                        <strong className="ml-2">
                          {selectedCard.cardAttribute}
                        </strong>
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
    </div>
  );
};

export default CardContainer;
