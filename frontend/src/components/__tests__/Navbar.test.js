import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../Navbar';

test('renders navbar with title', () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );
  const linkElement = screen.getByText(/LeetCode Tracker/i);
  expect(linkElement).toBeInTheDocument();
});
