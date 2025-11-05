import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the LeetCode Tracker</h1>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <Link to="/add-entry">Add Entry</Link>
    </div>
  );
}

export default HomePage;
