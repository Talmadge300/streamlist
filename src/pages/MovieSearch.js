import React, { useState } from 'react';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const apiKey = '9f27b010236b87e320ed1495b08fcbc5';

  const handleSearch = async () => {
    if (query.trim() === '') return;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    setResults(data.results || []);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Search Movies</h2>
      <input
        type="text"
        placeholder="Enter a movie name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ marginTop: '1rem' }}>
        {results.map((movie) => (
          <div key={movie.id} style={{ marginBottom: '1rem' }}>
            <h4>{movie.title}</h4>
            <p>{movie.overview}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
