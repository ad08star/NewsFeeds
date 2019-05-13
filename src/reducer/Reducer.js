const initialState = {
  newList: "",
  pageSize: "",
  cityID: "",
  currentPage: "",
  pages: "",
  showSearch: true,
  searchKey: "",
  total: ""
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "FETCH_NEWS":
      newState.newList = action.value.response.results;
      newState.pageSize = action.value.response.pageSize;
      newState.currentPage = action.value.response.currentPage;
      newState.pages = action.value.response.pages;
      newState.showSearch = false;
      newState.searchKey = action.value.response.searchKey;
      newState.total = action.value.response.total;
      break;

    default:
      newState.newList = "";
      newState.pageSize = "";
      newState.cityID = "";
      newState.currentPage = "";
      newState.pages = "";
      newState.showSearch = true;
      newState.searchKey = "";
      newState.total = "";
      break;
  }
  return newState;
};

export default reducer;
