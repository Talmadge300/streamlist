import React, { useState } from "react";
import "./MovieSearch.css";
import { useStreamList } from "../context/StreamListContext";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { addToStreamList } = useStreamList();

  const apiKey = "9f27b010236b87e320ed1495b08fcbc5";

  const handleSearch = async () => {
    if (query.trim() === "") return;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      query
    )}`;
    const response = await fetch(url);
    const data = await response.json();
    setResults(data.results || []);
  };

  return (
    <div className="movie-search-container">
      <h2>Search Movies</h2>
      <input
        type="text"
        placeholder="Enter a movie name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div className="movie-results">
        {results.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h4>{movie.title}</h4>
            <p className="release-date">{movie.release_date}</p>
            <p className="overview">
              {movie.overview && movie.overview.length > 100
                ? `${movie.overview.substring(0, 97)}...`
                : movie.overview}
            </p>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : "https://via.placeholder.com/150"
              }
              alt={movie.title}
              className="movie-poster"
            />
            <button onClick={() => addToStreamList(movie.title)}>
              Add to StreamList
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
