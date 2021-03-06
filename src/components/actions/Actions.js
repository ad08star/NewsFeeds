import axios from "axios";

export const fetchNewsAsync = data => {
  return { type: "FETCH_NEWS", value: data };
};

// initial api call for first ten newsfeeds using search
export const fetchNews = id => {
  return dispatch => {
    axios
      .get(
        "https://content.guardianapis.com/search?api-key=6af7a235-d5f0-4243-8490-864073b78638&q=" +
          id +
          "&show-fields=thumbnail,headline&show-tags=keyword&page=1&page-size=10"
      )
      .then(response => {
        var resultData = response.data;
        resultData.response["searchKey"] = id;
        console.log("resultData: ", resultData);
        dispatch(fetchNewsAsync(resultData));
      })
      .catch(error => console.log(error.response));
  };
};

// note to self: Entire app can be run using this api call only just like one reducer action :P

export const fetchNextPageNews = (pageNumber, id) => {
  return dispatch => {
    axios
      .get(
        "https://content.guardianapis.com/search?api-key=6af7a235-d5f0-4243-8490-864073b78638&q=" +
          id +
          "&show-fields=thumbnail,headline&show-tags=keyword&page=" +
          pageNumber +
          "&page-size=10"
      )
      .then(response => {
        var resultData = response.data;
        resultData.response["searchKey"] = id;
        console.log("resultData2: ", resultData);
        dispatch(fetchNewsAsync(resultData));
      })
      .catch(error => console.log(error.response));
  };
};
