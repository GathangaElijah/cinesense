import { useState, useEffect } from "react";

const WATCHLIST_KEY = "cinesense_watchlist";

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (stored) setWatchlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const add = (item) => {
    if (!watchlist.find((w) => w.id === item.id || w.imdbID === item.imdbID)) {
      setWatchlist([...watchlist, { ...item, watched: false }]);
    }
  };

  const remove = (id) => {
    setWatchlist(watchlist.filter((w) => w.id !== id && w.imdbID !== id));
  };

  const toggleWatched = (id) => {
    setWatchlist(
      watchlist.map((w) =>
        w.id === id || w.imdbID === id ? { ...w, watched: !w.watched } : w
      )
    );
  };

  return { watchlist, add, remove, toggleWatched };
};
