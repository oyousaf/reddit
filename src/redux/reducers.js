const initialState = {
  searchTerm: "",
  posts: [],
  selectedItem: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "SET_SELECTED_ITEM":
      return {
        ...state,
        selectedItem: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
