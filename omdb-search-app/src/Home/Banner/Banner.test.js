import { render, screen } from '@testing-library/react';
import { Banner } from '.';

test('renders the banner with no custom class and message', () => {
  const { container } = render(<Banner message="Test Message" customClass='success' />);
  expect(screen.queryByText(message)).toBeNull()
  expect(container.firstChild.classList.contains('banner')).toBe(true);
});

test('renders the banner for success or danger', () => {
    const {container} = render(<Banner />);
    expect(container.firstChild.classList.contains('banner')).toBe(true)
});