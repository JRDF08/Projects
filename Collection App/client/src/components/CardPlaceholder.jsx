const CardPlaceholder = ({ isLoaded, imageUrl, cardName }) => {
  return (
    <div className="w-full h-full bg-gray-300 rounded-md flex justify-center items-center">
      {/* Show loader or image */}
      {!isLoaded ? (
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div> // Loading spinner
      ) : (
        <div className="text-center text-gray-600">{cardName}</div> // Card name text
      )}
    </div>
  );
};

export default CardPlaceholder;
