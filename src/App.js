import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StreamList from './pages/StreamList';
import Movies from './pages/Movies';
import About from './pages/About';
import MovieSearch from './pages/MovieSearch';
import './App.css';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<MovieSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
