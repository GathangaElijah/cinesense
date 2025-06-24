import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import MovieCard from "../components/MovieCard/MovieCard";
import { searchTMDB } from "../services/tmdb";
import "./HomePage.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);

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
      setLoading(true);
      setError("")
      try {
      const data = await searchTMDB(debouncedQuery);
      console.log("Fetched data:", data);
      setResults(data);
      } catch (err) {
        console.error("API fetch error:", err);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
      
    };

    fetchData();
  }, [debouncedQuery]);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${import.meta.env.VITE_CINESENSE_TMDB_API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`TMDB trending error: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched trending data:", data.results);
        setTrending(data.results || []);
      } catch (err) {
        console.error("Trending fetch error:", err);
        setError("Failed to load trending content.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchTrending();
  }, []);

  return (
    <div>
      <h1 className="home-title">Movie / TV Show Discovery</h1>
      <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />

      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="movie-grid">
      {!loading && !error && results.length === 0 && debouncedQuery && (
          <p className="no-results">No results found.</p>
        )}
        {debouncedQuery
          ? results.map((item) => <MovieCard key={item.id} item={item} />)
          : trending.map((item) => <MovieCard key={item.id} item={item} />)
        }
      </div>
    </div>
  );
};

export default Home;
