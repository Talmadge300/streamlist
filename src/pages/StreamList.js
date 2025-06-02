import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

function StreamList() {
  const [movie, setMovie] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (movie.trim() === '') return;

    const newMovie = { text: movie, isCompleted: false };
    setMovieList([...movieList, newMovie]);
    console.log('Movie added:', movie);
    setMovie('');
  };

  const toggleComplete = (index) => {
    const updated = [...movieList];
    updated[index].isCompleted = !updated[index].isCompleted;
    setMovieList(updated);
    console.log(`Toggled complete for: ${updated[index].text}`);
  };

  const deleteMovie = (index) => {
    console.log('Deleted movie:', movieList[index].text);
    const updated = [...movieList];
    updated.splice(index, 1);
    setMovieList(updated);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(movieList[index].text);
    console.log('Started editing:', movieList[index].text);
  };

  const saveEdit = (index) => {
    const updated = [...movieList];
    console.log(`Saving edit: ${movieList[index].text} → ${editText}`);
    updated[index].text = editText;
    setMovieList(updated);
    setEditingIndex(null);
    setEditText('');
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
          <li key={index} style={{ marginTop: '1rem' }}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ marginRight: '0.5rem' }}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: item.isCompleted ? 'line-through' : 'none',
                    marginRight: '1rem',
                  }}
                >
                  {item.text}
                </span>

                <button
                  onClick={() => toggleComplete(index)}
                  style={{ marginRight: '0.5rem' }}
                  title="Mark as complete"
                >
                  <CheckIcon />
                </button>

                <button
                  onClick={() => startEditing(index)}
                  style={{ marginRight: '0.5rem' }}
                  title="Edit"
                >
                  <EditIcon />
                </button>

                <button
                  onClick={() => deleteMovie(index)}
                  title="Delete"
                >
                  <DeleteIcon />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;
