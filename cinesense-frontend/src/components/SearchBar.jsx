import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search for movies or TV shows..."
        value={value}
        onChange={onChange}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "500px",
    margin: "20px auto",
    padding: "0 10px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
};

export default SearchBar;
