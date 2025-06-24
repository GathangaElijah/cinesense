import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import MovieCard from "../components/MovieCard/MovieCard";
import { searchTMDB } from "../services/tmdb";
import { searchOMDB } from "../services/omdb";
import "./HomePage.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const handleNext = () => {
    if (page < maxPages) {
      setPage((prev) => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

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
      let data = await searchTMDB(debouncedQuery, page);
      let totalPages = null;

      if (data.length > 0) {
        totalPages = data.totalPages;
        console.log("TMDB total pages:", totalPages);
      } else {
        console.warn("TMDB empty, trying OMDB...");
        data = await searchOMDB(debouncedQuery, page);
        // Similarly, have searchOMDB return { results, totalPages }
        totalPages = data.totalPages;
        console.log("OMDB total pages:", totalPages);
      }
      setResults(data.results || data);
      setMaxPages(totalPages);
      } catch (err) {
        console.error("API fetch error:", err);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
      
    };

    fetchData();
  }, [debouncedQuery, page]);

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
  }, [page]);

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
          ? results.map((item) => <MovieCard key={item.id || item.imdb} item={item} />)
          : trending.map((item) => <MovieCard key={item.id || item.imdb} item={item} />)
        }
      </div>

      {results.length > 0 && (
      <div className="pagination">
        <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
      <button onClick={handleNext} disabled={page >= maxPages}>Next</button>
      </div>
)}


    </div>
  );
};

export default Home;
