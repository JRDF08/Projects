const FilterByRole = ({ selectedRole, onRoleChange }) => {
  const handleRoleChange = (e) => {
    onRoleChange(e.target.value);
  };

  return (
    <div>
      <select value={selectedRole} onChange={handleRoleChange}>
        <option value="">All Roles</option>
        <option value="Leader">Leader</option>
        <option value="Character">Character</option>
        <option value="Stage">Stage</option>
        <option value="Event">Event</option>
      </select>
    </div>
  );
};

export default FilterByRole;
