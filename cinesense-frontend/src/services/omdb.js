const OMDB_API_KEY = import.meta.env.VITE_CINESENSE_OMDB_API_KEY;
const OMDB_BASE_URL = "https://www.omdbapi.com";

export const searchOMDB = async (query, page = 1) => {
    if (!query) return [];
  
    try {
      const response = await fetch(
        `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
      );
      if (!response.ok) {
        throw new Error(`OMDB API error: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.Response === "False") {
        return { results: [], totalPages: 0 };
      }
      const totalPages = Math.ceil(parseInt(data.totalResults) / 10); // OMDB returns 10 per page

  
      return {
        results: data.Search,
        totalPages,
    };
    } catch (error) {
      console.error("Error fetching OMDB data:", error);
      return [];
    }
  };
  