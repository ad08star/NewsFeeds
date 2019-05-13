import React, { Component } from "react";
import "./App.css";
import { Form } from "react-bootstrap";
import HeaderNavbar from "./components/HeaderNavbar";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import * as actionCreator from "./components/actions/Actions";
import logo from "./logo.svg";

var searchStr = "";
class App extends Component {
  handleChange = e => {
    searchStr = e.target.value;
  };

  handlePageChange(pageNumber) {
    console.log(pageNumber);
  }
  render() {
    var newsDivs = [];
    var newsList = [...this.props.newList];
    console.log("newsList:", newsList);
    if (newsList.length > 0) {
      newsDivs.push(
        <h4 key="0">
          Results for search <em>"{this.props.searchKey}"</em>
        </h4>
      );
      newsList.forEach(x => {
        var keywordDivs = [];
        var keywordList = [...x.tags];
        keywordList.forEach(k => {
          keywordDivs.push(
            <div
              key={k.id}
              onClick={e => this.props.fetchNextPageNews(1, k.webTitle)}
              style={{ cursor: "pointer" }}
            >
              {k.webTitle}
            </div>
          );
        });
        newsDivs.push(
          <div
            key={x.id}
            style={{
              border: "2px solid #c1666b",
              margin: "5px",
              borderRadius: "10px"
            }}
          >
            <span>
              <a href={x.webUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={x.fields.thumbnail != null ? x.fields.thumbnail : logo}
                  height="100%"
                  width="20%"
                  alt="Thumbnail"
                />
                <h4>{x.fields.headline}</h4>
              </a>
            </span>
            <div
              style={
                keywordDivs.length > 0
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <h5>Related Topics:</h5>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                {keywordDivs}
              </div>
            </div>
          </div>
        );
        //  console.log(x);
      });
    } else if (this.props.searchKey !== "") {
      newsDivs.push(
        <h4>
          No results for search <em>"{this.props.searchKey}"</em>
        </h4>
      );
    }
    return (
      <div className="App">
        <HeaderNavbar
          pagetitle={"NewsFeeds"}
          fetchNextPageNews={this.props.fetchNextPageNews}
          show={this.props.showSearch}
        />

        <div
          style={
            this.props.showSearch ? { display: "block" } : { display: "none" }
          }
        >
          <Form>
            <input
              className="navInput"
              type="text"
              onChange={this.handleChange}
              style={{ width: "35%", border: "2px solid #e4d8d8" }}
              placeholder="Search News"
            />
            <button
              className="navOutput"
              onClick={this.props.fetchNews}
              style={{
                background: "#c1666b",
                color: "white",
                border: "2px solid #c1666b"
              }}
            >
              Search
            </button>
          </Form>
          <br />
          <div
            id="link-tag"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <p onClick={e => this.props.fetchNextPageNews(1, "World Politics")}>
              Politics
            </p>
            <p onClick={e => this.props.fetchNextPageNews(1, "Sports")}>
              Sports
            </p>
            <p onClick={e => this.props.fetchNextPageNews(1, "Entertainment")}>
              Entertainment
            </p>
            <p onClick={e => this.props.fetchNextPageNews(1, "Movies")}>
              Movies
            </p>
            <p onClick={e => this.props.fetchNextPageNews(1, "Business")}>
              Business
            </p>
          </div>
        </div>
        <div
          style={{
            border: "2px solid #c1666b",
            margin: "10px",
            borderRadius: "20px"
          }}
        >
          {newsDivs}
        </div>
        <div
          style={
            this.props.newList.length > 0
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <Pagination
            activePage={this.props.currentPage}
            itemsCountPerPage={10}
            totalItemsCount={
              this.props.total > 20000 ? 20000 : this.props.total
            }
            pageRangeDisplayed={5}
            onChange={pageNumber =>
              this.props.fetchNextPageNews(pageNumber, this.props.searchKey)
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    newList: state.newList,
    pageSize: state.pageSize,
    cityID: state.cityID,
    currentPage: state.currentPage,
    pages: state.pages,
    showSearch: state.showSearch,
    searchKey: state.searchKey,
    total: state.total
  };
};

const mapDispachToProps = dispatch => {
  console.log("searchStr", searchStr);
  return {
    fetchNews: event => {
      event.preventDefault();
      return dispatch(actionCreator.fetchNews(searchStr));
    },
    fetchNextPageNews: (pageNumber, searchKey) => {
      return dispatch(actionCreator.fetchNextPageNews(pageNumber, searchKey));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(App);
