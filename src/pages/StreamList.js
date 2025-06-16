import React, { useState } from "react";
import { useStreamList } from "../context/StreamListContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

function StreamList() {
  const {
    streamList,
    addToStreamList,
    deleteFromStreamList,
    toggleComplete,
    editStreamList,
  } = useStreamList();

  const [movie, setMovie] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (movie.trim() === "") return;
    addToStreamList(movie);
    setMovie("");
  };

  const handleSaveEdit = (index) => {
    if (editText.trim() === "") return;
    editStreamList(index, editText);
    setEditingIndex(null);
    setEditText("");
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
        {streamList.map((item, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: item.isCompleted ? "line-through" : "none",
                  }}
                >
                  {item.text}
                </span>
                <button onClick={() => toggleComplete(index)}>
                  <CheckIcon />
                </button>
                <button onClick={() => {
                  setEditingIndex(index);
                  setEditText(item.text);
                }}>
                  <EditIcon />
                </button>
                <button onClick={() => deleteFromStreamList(index)}>
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
