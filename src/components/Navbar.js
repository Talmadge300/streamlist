import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
      <Link to="/" style={{ marginRight: '1rem', color: 'white' }}>StreamList</Link>
      <Link to="/movies" style={{ marginRight: '1rem', color: 'white' }}>Movies</Link>
      <Link to="/search" style={{ marginRight: '1rem', color: 'white' }}>Search</Link>
      <Link to="/about" style={{ color: 'white' }}>About</Link>
    </nav>
  );
}

export default Navbar;
