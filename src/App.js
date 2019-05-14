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
    // console.log("newsList:", newsList);
    if (newsList.length > 0) {
      newsDivs.push(
        <div key="0">
          <h4 style={{ color: "#c1666b" }}>
            Results for search <em>"{this.props.searchKey}"</em>
          </h4>
        </div>
      );
      newsList.forEach(x => {
        var keywordDivs = [];
        var keywordList = [...x.tags];
        keywordList.forEach(k => {
          keywordDivs.push(
            <div
              className="keyword"
              key={k.id}
              onClick={e => this.props.fetchNextPageNews(1, k.webTitle)}
            >
              {k.webTitle}
            </div>
          );
        });
        newsDivs.push(
          <div
            className="col-md-12 col-sm-12 col-lg-12 col-xs-12"
            key={x.id}
            style={{
              border: "2px solid #c1666b",
              margin: "5px",
              borderRadius: "10px",
              background: "white"
            }}
          >
            <div className="col-md-4 col-sm-4 col-lg-4 col-xs-4">
              <a href={x.webUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={x.fields.thumbnail != null ? x.fields.thumbnail : logo}
                  height="100%"
                  width="80%"
                  alt="Thumbnail"
                  style={{
                    margin: "10px",
                    borderRadius: "5px",
                    border: "1px solid #c1666b"
                  }}
                />{" "}
              </a>
            </div>
            <div className="col-md-8 col-sm-8 col-lg-8 col-xs-8">
              <a href={x.webUrl} target="_blank" rel="noopener noreferrer">
                <h4>{x.fields.headline}</h4>
              </a>

              <div
                style={
                  keywordDivs.length > 0
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <br />
                <h5>
                  <u>Related Topics:</u>
                </h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignContent: "flex-end",
                    flexWrap: "wrap"
                  }}
                >
                  {keywordDivs}
                </div>
              </div>
            </div>
          </div>
        );
        //  console.log(x);
      });
    } else if (this.props.searchKey !== "") {
      newsDivs.push(
        <h4 style={{ color: "#c1666b" }}>
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
          className="col-md-12 col-sm-12 col-lg-12 col-xs-12"
          style={{
            border: "2px solid #c1666b",
            borderRadius: "20px",
            margin: "1%",
            width: "98%",
            background: "#f7eedc"
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
  //console.log("searchStr", searchStr);
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
