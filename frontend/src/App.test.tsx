import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main app header', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /Todo App/i, level: 1 });
  expect(headerElement).toBeInTheDocument();
});