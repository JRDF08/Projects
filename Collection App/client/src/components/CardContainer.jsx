import { useState, useEffect } from "react";

import FilterByColor from "./FilterByColor.jsx";
import FilterByRole from "./FilterByRole.jsx";
import FilterBySet from "./FilterBySet.jsx";

import Card from "./Card.jsx";
import CardModal from "./CardModal.jsx";
import Pagination from "./Pagination.jsx";

const CardContainer = () => {
  const [cards, setCards] = useState([]);
  const [totalCards, setTotalCards] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSet, setSelectedSet] = useState("");

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);

    window.history.pushState(
      { cardNumber: card.number },
      `Card ${card.cardName}`,
      `${card.cardNumber}`
    );

    //   // navigate(`/card/${card.cardNumber}`, {
    //   //   state: { cardNumber: card.number },
    //   // });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCard(null);

    window.history.pushState({}, "", "/");
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

  const fetchCards = async (color, role, set) => {
    try {
      console.log("Fetching cards with:", { color, role, set });
      let url = "http://localhost:3000/card/list?";

      if (color) {
        url += `color=${color}&`;
      }

      if (role) {
        url += `role=${role}&`;
      }

      if (set) {
        url += `set=${set}&`;
      }

      url = url.endsWith("&") ? url.slice(0, -1) : url;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCards(data);
        setTotalCards(data.length);
      } else {
        console.error("Failed to fetch cards");
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setCurrentPage(1);
    fetchCards(color, selectedRole, selectedSet);
  };

  const handleRoleChange = (role) => {
    console.log("Role selected:", role);
    setSelectedRole(role);
    setCurrentPage(1);
    fetchCards(selectedColor, role, selectedSet);
  };

  const handleSetChange = (set) => {
    console.log("Set selected:", set);
    setSelectedSet(set);
    setCurrentPage(1);
    fetchCards(selectedColor, selectedRole, set);
  };

  useEffect(() => {
    fetchCards(selectedColor, selectedRole, selectedSet);
  }, [selectedColor, selectedRole, selectedSet]);

  const cardsPerPage = 25;

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = cards.slice(startIndex, startIndex + cardsPerPage);

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
      <FilterBySet selectedSet={selectedSet} onSetChange={handleSetChange} />

      <div className="w-full mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <span className="text-gray-700">Total Cards: {totalCards}</span>
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
          setCards={setCards}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default CardContainer;
