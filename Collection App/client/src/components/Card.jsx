import PropTypes from "prop-types";

const Card = ({ card, handleCardClick }) => {
  return (
    <div
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
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    cardImage: PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
    }).isRequired,
    cardName: PropTypes.string.isRequired,
  }).isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default Card;
