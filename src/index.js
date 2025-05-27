import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // Important: this loads the styling
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
