import React, { useEffect, useState } from "react";
import { useStreamList } from "../context/StreamListContext";

function Movies() {
  const [movies, setMovies] = useState([]);
  const { addToStreamList } = useStreamList();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=9f27b010236b87e320ed1495b08fcbc5"
        );
        const data = await response.json();
        if (data && data.results) {
          setMovies(data.results);
        } else {
          setMovies([]);
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setMovies([]);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Movies Page</h2>
      <div>
        {movies.map((movie) => (
          <div key={movie.id} style={{ margin: "1rem 0" }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <button onClick={() => addToStreamList(movie.title)}>
              Add to StreamList
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
