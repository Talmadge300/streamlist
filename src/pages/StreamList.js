import React, { useState } from 'react';

function StreamList() {
  const [movie, setMovie] = useState('');
  const [movieList, setMovieList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (movie.trim() === '') return;
    console.log('Movie added:', movie);
    setMovieList([...movieList, movie]);
    setMovie('');
  };

  return (
    <div className="page">
      <h2>My StreamList</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a movie or show"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {movieList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;
