const FilterBySet = ({ selectedSet, onSetChange }) => {
  const handleSetChange = (e) => {
    onSetChange(e.target.value);
  };

  return (
    <div>
      <select value={selectedSet} onChange={handleSetChange}>
        <option value="">All OP-Series</option>
        <option value="-ROMANCE DAWN- [OP-01]">-ROMANCE DAWN- [OP-01]</option>
        <option value="-Paramount War- [OP-02]">-Paramount War- [OP-02]</option>
      </select>
    </div>
  );
};

export default FilterBySet;
