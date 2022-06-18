import { render, screen } from '@testing-library/react';
import { Header } from '.';


test('renders Header', () => {
  const { container } = render(<Header />);
  expect(container.getElementsByClassName("header").length).toBe(1);
  const linkElement = screen.getByText(/OMDB/i);
  expect(linkElement).toBeInTheDocument();
});