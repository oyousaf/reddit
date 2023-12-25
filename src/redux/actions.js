export const setSearchTerm = (term) => ({
  type: "SET_SEARCH_TERM",
  payload: term,
});

export const setPosts = (posts) => ({
  type: "SET_POSTS",
  payload: posts,
});

export const setSelectedItem = (item) => ({
  type: "SET_SELECTED_ITEM",
  payload: item,
});

export default {
  setSearchTerm,
  setPosts,
  setSelectedItem,
};
