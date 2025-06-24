import React from "react";
import "./SearchBar.css";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Search for movies or TV shows..."
        value={value}
        onChange={onChange}
        className="searchbar-input"
      />
    </div>
  );
};

export default SearchBar;
