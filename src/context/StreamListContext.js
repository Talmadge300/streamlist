import React, { createContext, useContext, useEffect, useState } from "react";

const StreamListContext = createContext();

export function useStreamList() {
  return useContext(StreamListContext);
}

export function StreamListProvider({ children }) {
  const [streamList, setStreamList] = useState(() => {
    const saved = localStorage.getItem("streamList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("streamList", JSON.stringify(streamList));
  }, [streamList]);

  const addToStreamList = (movieTitle) => {
    if (!movieTitle || typeof movieTitle !== "string") return;
    setStreamList((prev) => [...prev, { text: movieTitle, isCompleted: false }]);
  };

  const deleteFromStreamList = (index) => {
    setStreamList((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const toggleComplete = (index) => {
    setStreamList((prev) => {
      const updated = [...prev];
      updated[index].isCompleted = !updated[index].isCompleted;
      return updated;
    });
  };

  const editStreamList = (index, newText) => {
    setStreamList((prev) => {
      const updated = [...prev];
      updated[index].text = newText;
      return updated;
    });
  };

  return (
    <StreamListContext.Provider
      value={{
        streamList,
        addToStreamList,
        deleteFromStreamList,
        toggleComplete,
        editStreamList,
      }}
    >
      {children}
    </StreamListContext.Provider>
  );
}
