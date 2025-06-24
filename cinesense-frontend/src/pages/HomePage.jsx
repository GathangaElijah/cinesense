import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import MovieCard from "../components/MovieCard/MovieCard";
import { searchTMDB } from "../services/tmdb";
import "./HomePage.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      const data = await searchTMDB(debouncedQuery);
      console.log("Fetched data:", data);
      setResults(data);
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <div>
      <h1 className="home-title">Movie / TV Show Discovery</h1>
      <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="movie-grid">
        {results.length === 0 && debouncedQuery && (
          <p className="no-results">No results found.</p>
        )}
        {results.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
