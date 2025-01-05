import { useState, useEffect } from "react";
import CardPlaceholder from "./CardPlaceholder"; // Import the placeholder component

const CardTracker = () => {
  const [cards, setCards] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [collectedCards, setCollectedCards] = useState([]); // Store the cards user has collected

  // Example of cards that have been collected (can be fetched from a server or DB)
  const allCards = [
    { id: 1, name: "Card 1", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "Card 2", imageUrl: "https://via.placeholder.com/150" },
    { id: 3, name: "Card 3", imageUrl: "https://via.placeholder.com/150" },
    // More cards...
  ];

  useEffect(() => {
    // Simulate fetching cards
    setTimeout(() => {
      // Assuming the user has collected some cards
      setCollectedCards([allCards[0], allCards[2]]);
      setIsLoaded(true);
    }, 2000); // Simulating a 2-second load time
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {allCards.map((card) => (
        <div
          key={card.id}
          className="w-40 h-60 p-4 bg-gray-200 rounded-lg shadow-lg"
        >
          {collectedCards.some(
            (collectedCard) => collectedCard.id === card.id
          ) ? (
            <div
              className="w-full h-full bg-cover bg-center rounded-md"
              style={{ backgroundImage: `url(${card.imageUrl})` }}
            ></div>
          ) : (
            <CardPlaceholder
              isLoaded={isLoaded}
              imageUrl={card.imageUrl}
              cardName={card.name}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CardTracker;
