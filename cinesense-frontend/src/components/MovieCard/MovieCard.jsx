import React from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item, onAdd, onRemove, onToggleWatched, isInWatchlist }) => {
  const navigate = useNavigate();
  const title = item.title || item.name || item.Title;
  const image = item.poster_path 
    ? `https://image.tmdb.org/t/p/w200${item.poster_path}` 
    : item.Poster !== "N/A" ? item.Poster : "fallback-image.jpg";

     // Extract ratings
  const tmdbRating = item.vote_average ? `${item.vote_average}/10` : null;
  const imdbRating = item.imdbRating ? `${item.imdbRating}/10` : null;
  let rtRating = null;
  if (item.Ratings && Array.isArray(item.Ratings)) {
    const rt = item.Ratings.find(r => r.Source === "Rotten Tomatoes");
    rtRating = rt ? rt.Value : null;
  }
  return (
    <div className="movie-card" onClick={() => navigate(`/details/${item.id || item.imdbID}`)}>
      <img src={image} alt={title} />
      <p className="movie-title">{title}</p>
      <div className="ratings">
        {tmdbRating && <p>TMDB: {tmdbRating}</p>}
        {imdbRating && <p>IMDB: {imdbRating}</p>}
        {rtRating && <p>Rotten Tomatoes: {rtRating}</p>}
      </div>
      <div className="watchlist-buttons">
        {isInWatchlist ? (
          <>
            <button onClick={(e) => { e.stopPropagation(); onRemove(); }}>Remove</button>
            <button onClick={(e) => { e.stopPropagation(); onToggleWatched(); }}>Toggle Watched</button>
          </>
        ) : (
          <button onClick={(e) => { e.stopPropagation(); onAdd(); }}>Add to Watchlist</button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
