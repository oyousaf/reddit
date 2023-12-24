import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PostList from "./PostList.test";
import { setSearchTerm, setPosts, setSelectedItem } from "../redux/actions";

const mockStore = configureStore([]);

describe("PostList component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      searchTerm: "",
      posts: [],
      selectedItem: null,
    });
  });

  it("renders the PostList component", () => {
    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    );
    const inputElement = screen.getByPlaceholderText(/search reddit/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("dispatches setSearchTerm action on input change", () => {
    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    );
    const inputElement = screen.getByPlaceholderText(/search reddit/i);

    fireEvent.change(inputElement, { target: { value: "cats" } });

    expect(store.getActions()).toEqual([setSearchTerm("cats")]);
  });

  it("dispatches setPosts action on component mount", async () => {
    const mockFetchPosts = jest.fn().mockResolvedValue([]);

    render(
      <Provider store={store}>
        <PostList fetchPosts={mockFetchPosts} />
      </Provider>
    );

    await waitFor(() => {
      expect(store.getActions()).toEqual([setPosts([])]);
    });
  });

  it("renders loading spinner while fetching data", () => {
    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    );
    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument();
  });

  it("renders posts after data is fetched", async () => {
    // Mock fetchPosts function
    const mockFetchPosts = jest.fn().mockResolvedValue([{ id: 1, title: "Test Post" }]);

    render(
      <Provider store={store}>
        <PostList fetchPosts={mockFetchPosts} />
      </Provider>
    );

    await waitFor(() => {
      const postElement = screen.getByText(/test post/i);
      expect(postElement).toBeInTheDocument();
    });
  });

  it("dispatches setSelectedItem action on post item click", () => {
    const mockFetchPosts = jest.fn().mockResolvedValue([{ id: 1, title: "Test Post" }]);

    render(
      <Provider store={store}>
        <PostList fetchPosts={mockFetchPosts} />
      </Provider>
    );

    const postItem = screen.getByText(/test post/i);
    fireEvent.click(postItem);

    expect(store.getActions()).toEqual([setSelectedItem({ id: 1, title: "Test Post" })]);
  });

  it("handles input change and updates searchTerm in the store", () => {
    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText(/search reddit/i);
    fireEvent.change(inputElement, { target: { value: "new search" } });

    expect(store.getActions()).toEqual([setSearchTerm("new search")]);
  });

  it("handles item selection and updates selectedItem in the store", () => {
    
    const mockFetchPosts = jest.fn().mockResolvedValue([{ id: 1, title: "Test Post" }]);

    render(
      <Provider store={store}>
        <PostList fetchPosts={mockFetchPosts} />
      </Provider>
    );

    const postItem = screen.getByText(/test post/i);
    fireEvent.click(postItem);

    expect(store.getActions()).toEqual([setSelectedItem({ id: 1, title: "Test Post" })]);
  });

  it("matches the snapshot", () => {
    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    );
    const { container } = screen;
    expect(container).toMatchSnapshot();
  });
});
