const FilterByColor = ({ selectedColor, onColorChange }) => {
  const handleColorChange = (e) => {
    onColorChange(e.target.value);
  };

  return (
    <div>
      <select value={selectedColor} onChange={handleColorChange}>
        <option value="">All Colors</option>
        <option value="Red">Red</option>
        <option value="Green">Green</option>
        <option value="Blue">Blue</option>
        <option value="Purple">Purple</option>
        <option value="Black">Black</option>
        <option value="Yellow">Yellow</option>
        <option value="Multicolor">Multicolor</option>
      </select>
    </div>
  );
};

export default FilterByColor;
