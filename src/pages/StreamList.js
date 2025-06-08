import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

function StreamList() {
  const [movie, setMovie] = useState('');
  const [movieList, setMovieList] = useState(() => {
    const saved = localStorage.getItem('movies');
    return saved ? JSON.parse(saved) : [];
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movieList));
  }, [movieList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (movie.trim() === '') return;
    setMovieList([...movieList, { text: movie, isCompleted: false }]);
    setMovie('');
  };

  const toggleComplete = (index) => {
    const updated = [...movieList];
    updated[index].isCompleted = !updated[index].isCompleted;
    setMovieList(updated);
  };

  const deleteMovie = (index) => {
    const updated = [...movieList];
    updated.splice(index, 1);
    setMovieList(updated);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(movieList[index].text);
  };

  const saveEdit = (index) => {
    const updated = [...movieList];
    updated[index].text = editText;
    setMovieList(updated);
    setEditingIndex(null);
    setEditText('');
  };

  return (
    <div style={{ padding: '1rem' }}>
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
          <li key={index} style={{ marginTop: '1rem' }}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: item.isCompleted ? 'line-through' : 'none', marginRight: '1rem' }}>
                  {item.text}
                </span>
                <button onClick={() => toggleComplete(index)}><CheckIcon /></button>
                <button onClick={() => startEditing(index)}><EditIcon /></button>
                <button onClick={() => deleteMovie(index)}><DeleteIcon /></button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;
