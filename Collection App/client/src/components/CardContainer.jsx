import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FilterByColor from "./FilterByColor.jsx";
import FilterByRole from "./FilterByRole.jsx";

const CardContainer = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);

    window.history.pushState(
      { cardNumber: card.number },
      `Card ${card.cardName}`,
      `${card.cardNumber}`
    );

    // navigate(`/card/${card.cardNumber}`, {
    //   state: { cardNumber: card.number },
    // });
  };

  const handleCloseModal = () => {
    navigate("/", { replace: true });

    setShowModal(false);
    setSelectedCard(null);
  };

  const prevCard = () => {
    setSelectedCard((prev) => {
      const currentIndex = cards.indexOf(prev);
      const nextIndex =
        currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
      const nextCard = cards[nextIndex];

      window.history.pushState(
        { cardNumber: nextCard.cardNumber },
        `Card ${nextCard.cardName}`,
        `${nextCard.cardNumber}`
      );

      return nextCard;
    });
  };

  const nextCard = () => {
    setSelectedCard((prev) => {
      const currentIndex = cards.indexOf(prev);
      const nextIndex =
        currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
      const nextCard = cards[nextIndex];

      window.history.pushState(
        { cardNumber: nextCard.cardNumber },
        `Card ${nextCard.cardName}`,
        `${nextCard.cardNumber}`
      );

      return nextCard;
    });
  };

  const fetchCards = async (color, role) => {
    try {
      console.log("Fetching cards with:", { color, role });
      let url = "http://localhost:3000/card/list?";

      if (color) {
        url += `color=${color}&`;
      }

      if (role) {
        url += `role=${role}&`;
      }

      url = url.endsWith("&") ? url.slice(0, -1) : url;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCards(data);
      } else {
        console.error("Failed to fetch cards");
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    fetchCards(color, selectedRole);
  };

  const handleRoleChange = (role) => {
    console.log("Role selected:", role);
    setSelectedRole(role);
    fetchCards(selectedColor, role);
  };

  useEffect(() => {
    fetchCards();
  }, []);

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

  const cardsPerPage = 25;

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = cards.slice(startIndex, startIndex + cardsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <FilterByColor
        selectedColor={selectedColor}
        onColorChange={handleColorChange}
      />
      <FilterByRole
        selectedRole={selectedRole}
        onRoleChange={handleRoleChange}
      />
      <div className="w-full mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Card List
        </h1>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-full max-h-[calc(100vh-100px)] overflow-y-auto mx-auto"
          style={{ maxHeight: "800px" }}
        >
          {currentCards.length > 0 ? (
            currentCards.map((card, index) => (
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

        {/* Pagination Buttons */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700 hover:shadow-lg transition-all duration-300"
            }`}
          >
            Previous
          </button>
          {/* <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span> */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-lg ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400 transition-all duration-300"
                }`}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700 hover:shadow-lg transition-all duration-300"
            }`}
          >
            Next
          </button>
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
      </div>
    </>
  );
};

export default CardContainer;
