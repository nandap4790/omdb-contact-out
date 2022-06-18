import React from "react";
import { screen, render } from "@testing-library/react";
import { createStore } from "redux";
import Tile from ".";
import reducer from "../../store/reducers";
import { Provider } from "react-redux";

const initialState = {
	item: { Title: "movie title" },
};

const store = createStore(reducer, initialState);

const Wrapper = ({ children }) => (
	<Provider store={store}>{children}</Provider>
);

describe("Tile", () => {
  it("should render without any props", async () => {
    const { container } = render(<Tile />, { wrapper: Wrapper });
    expect(container.firstChild).toBeNull();
  });

  it("should render only movie name", async () => {
    const { container } = render(<Tile item={initialState.item} />, { wrapper: Wrapper });
    expect(container.getElementsByClassName("movie-title").length).toBe(1);
    expect(container.getElementsByClassName("movie-year").length).toBe(0);
    const domContent = screen.getByText(/movie title/i);
    expect(domContent).toBeInTheDocument();
  });

  it("should not render only movie year when movie name is not there", async () => {
    const initialState = {
        item: { Year: '2000' },
    };
    const { container } = render(<Tile item={initialState.item} />, { wrapper: Wrapper });
    expect(container.getElementsByClassName("movie-title").length).toBe(0);
    expect(container.getElementsByClassName("movie-year").length).toBe(0);
  });
});