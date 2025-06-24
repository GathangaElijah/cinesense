import React from "react";
import "./MovieCard.css";

const MovieCard = ({ item }) => {
  return (
    <div className="movie-card">
      {item.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
          alt={item.title || item.name}
          className="movie-poster"
        />
      ) : (
        <div className="no-image">No Image</div>
      )}
      <p className="movie-title">{item.title || item.name}</p>
    </div>
  );
};

export default MovieCard;
