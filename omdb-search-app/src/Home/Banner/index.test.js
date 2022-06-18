import { render, screen } from '@testing-library/react';
import { Banner } from '.';


test('renders banner without props', () => {
  const { container } = render(<Banner />);
  expect(container.getElementsByClassName("banner").length).toBe(1);
  expect(container.firstChild).toBeEmptyDOMElement();
});

test('renders banner with a custom class', () => {
	const { container } = render(<Banner customClass='test-class'/>);
	expect(container.getElementsByClassName("test-class").length).toBe(1);
	expect(container.firstChild).toBeEmptyDOMElement();
});

test('renders banner with a custom class and message', () => {
	const { container } = render(<Banner customClass='test-class' message="Test Message"/>);
	expect(container.getElementsByClassName("test-class").length).toBe(1);
	const linkElement = screen.getByText(/Test Message/i);
	expect(linkElement).toBeInTheDocument();
});