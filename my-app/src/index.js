import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import './Main.css';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* Add other routes here if needed */}
    </Routes>
  </Router>,
  document.getElementById('root')
);
