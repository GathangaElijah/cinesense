const TMDB_API_KEY = import.meta.env.VITE_CINESENSE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
// console.log("TMDB_API_KEY loaded:", TMDB_API_KEY);

export const searchTMDB = async (query, page = 1) => {
  if (!query) return [];

  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page={page}`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching TMDB data:", error);
    return [];
  }
};
