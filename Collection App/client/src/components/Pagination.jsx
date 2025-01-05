import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`px-3 py-2 text-sm rounded-lg ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-600 text-white hover:bg-gray-700 hover:shadow-lg transition-all duration-300"
        }`}
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 text-sm rounded-lg m-1 ${
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
        className={`px-3 py-2 text-sm rounded-lg ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-600 text-white hover:bg-gray-700 hover:shadow-lg transition-all duration-300"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
