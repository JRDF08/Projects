import { useState, useEffect } from "react";

import Card from "./Card.jsx";
import CardModal from "./CardModal.jsx";
import Pagination from "./Pagination.jsx";

const CardTracker = () => {
  const [cards, setCards] = useState([]);
  const [totalCards, setTotalCards] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCards = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/card/list?isAdded=Yes"
      );
      if (response.ok) {
        const fetchedCards = await response.json();
        setCards(fetchedCards);
        setTotalCards(fetchedCards.length);
        console.error("Failed to fetch cards");
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);

    window.history.pushState(
      { cardNumber: card.number },
      `Card ${card.cardName}`,
      `${card.cardNumber}`
    );
  };

  const cardsPerPage = 25;

  const filteredCards = cards.filter((card) => card.isAdded === "Yes");

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = filteredCards.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCard(null);

    window.history.pushState({}, "", "/");
  };

  const prevCard = () => {
    setSelectedCard((prev) => {
      const currentIndex = filteredCards.indexOf(prev);
      const nextIndex =
        currentIndex === 0 ? filteredCards.length - 1 : currentIndex - 1;
      const nextCard = filteredCards[nextIndex];

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
      const currentIndex = filteredCards.indexOf(prev);
      const nextIndex =
        currentIndex === filteredCards.length - 1 ? 0 : currentIndex + 1;
      const nextCard = filteredCards[nextIndex];

      window.history.pushState(
        { cardNumber: nextCard.cardNumber },
        `Card ${nextCard.cardName}`,
        `${nextCard.cardNumber}`
      );

      return nextCard;
    });
  };

  console.log("Filtered cards: ", filteredCards);

  return (
    <div>
      <div className="w-full mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <span className="text-gray-700">
            Total Cards: {filteredCards.length}
          </span>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-full max-h-[calc(100vh-100px)] overflow-y-auto mx-auto"
          style={{ maxHeight: "800px" }}
        >
          {currentCards.length > 0 ? (
            currentCards.map((card) => (
              <Card
                key={card.cardNumber}
                card={card}
                handleCardClick={handleCardClick}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No cards available.
            </p>
          )}
        </div>

        <CardModal
          selectedCard={selectedCard}
          handleCloseModal={handleCloseModal}
          prevCard={prevCard}
          nextCard={nextCard}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CardTracker;
