import { useState } from 'react'
import SearchBar from './components/SearchBar';

function App() {
  const [query, setQuery] = useState("")

   const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
     <div>
      <h1 style={{ textAlign: "center" }}>Movie / TV Show Discovery</h1>
      <SearchBar value={query} onChange={handleChange} />
      <p style={{ textAlign: "center" }}>Search query: {query}</p>
    </div>
  );
}

export default App
