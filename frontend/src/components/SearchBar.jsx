// SearchBar Component
import React from "react";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="form-group">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
    </div>
  );
};

export default SearchBar;
