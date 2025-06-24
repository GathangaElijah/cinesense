import React from "react";
import "./MovieCard.css";

const MovieCard = ({ item }) => {
  const title = item.title || item.name || item.Title;
  const image = item.poster_path 
    ? `https://image.tmdb.org/t/p/w200${item.poster_path}` 
    : item.Poster !== "N/A" ? item.Poster : "fallback-image.jpg";

  return (
    <div className="movie-card">
    <img src={image} alt={title} />
    <p>{title}</p>
  </div>
  );
};

export default MovieCard;
