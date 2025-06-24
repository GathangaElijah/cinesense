import React from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item }) => {
  const navigate = useNavigate();
  const title = item.title || item.name || item.Title;
  const image = item.poster_path 
    ? `https://image.tmdb.org/t/p/w200${item.poster_path}` 
    : item.Poster !== "N/A" ? item.Poster : "fallback-image.jpg";

  return (
    <div 
      className="movie-card"
      onClick={() => navigate(`/details/${item.id || item.imdbID}`)}
    >
      <img src={image} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default MovieCard;
