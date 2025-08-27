import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main app container', () => {
  render(<App />);
  const appHeader = screen.getByRole('banner');
  expect(appHeader).toBeInTheDocument();
  expect(appHeader).toHaveClass('App-header');
});