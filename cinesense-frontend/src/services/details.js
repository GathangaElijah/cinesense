// Data from TMDB page
export const fetchTMDBDetails = async (id) => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_CINESENSE_TMDB_API_KEY}&append_to_response=credits`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      return {
        title: data.title,
        overview: data.overview,
        release_date: data.release_date,
        image: `https://image.tmdb.org/t/p/w300${data.poster_path}`,
        ratings: { TMDB: data.vote_average },
        cast: data.credits.cast.slice(0, 5).map(c => c.name),
      };
    } catch {
      return null;
    }
  };
  
// Data from OMDB
export const fetchOMDBDetails = async (id) => {
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_CINESENSE_OMDB_API_KEY}&i=${id}&plot=full`);
      const data = await res.json();
      if (data.Response === "False") throw new Error();
      return {
        Title: data.Title,
        Plot: data.Plot,
        Released: data.Released,
        image: data.Poster,
        ratings: data.Ratings,
      };
    } catch {
      return null;
    }
  };
  