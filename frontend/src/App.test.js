import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders the Kind Paws login screen on the login route', () => {
  window.history.pushState({}, '', '/login');

  render(<App />);

  expect(screen.getAllByText(/kind paws/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
});

test('the navbar redirects to the services page', async () => {
  localStorage.setItem('kindPawsUser', JSON.stringify({
    _id: 'test-user',
    name: 'Aarav Sharma',
    email: 'aarav@example.com'
  }));
  window.history.pushState({}, '', '/');

  render(<App />);

  const navbarServicesLink = screen.getAllByRole('link', { name: 'Services' })[0];
  await userEvent.click(navbarServicesLink);

  expect(window.location.pathname).toBe('/services');
  expect(screen.getByText(/Expert help for every behaviour challenge/i)).toBeInTheDocument();
});

test('a trainer profile opens the consultation booking form', async () => {
  localStorage.setItem('kindPawsUser', JSON.stringify({
    _id: 'test-user',
    name: 'Aarav Sharma',
    email: 'aarav@example.com'
  }));
  window.history.pushState({}, '', '/trainer/1');

  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: 'Book a Consultation' }));

  expect(screen.getByLabelText(/dog name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/consultation date/i)).toBeInTheDocument();
});

test('the hero calls to action navigate to trainer discovery and how it works', () => {
  localStorage.setItem('kindPawsUser', JSON.stringify({
    _id: 'test-user',
    name: 'Aarav Sharma',
    email: 'aarav@example.com'
  }));
  window.history.pushState({}, '', '/');

  render(<App />);

  expect(screen.getByRole('link', { name: 'Find a Trainer' })).toHaveAttribute(
    'href',
    '/trainers'
  );
  expect(screen.getByRole('link', { name: 'How It Works' })).toHaveAttribute(
    'href',
    '/#how-it-works'
  );
});

test('a refreshed unknown route falls back to the home page', () => {
  localStorage.setItem('kindPawsUser', JSON.stringify({
    _id: 'test-user',
    name: 'Aarav Sharma',
    email: 'aarav@example.com'
  }));
  window.history.pushState({}, '', '/refreshed-route');

  render(<App />);

  expect(screen.getByRole('heading', { name: /better behaviour/i })).toBeInTheDocument();
  expect(window.location.pathname).toBe('/');
});
