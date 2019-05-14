import React, { Component } from "react";
import "../App.css";
import { Modal } from "react-bootstrap";

export default class HeaderNavbar extends Component {
  constructor(props) {
    super(props);
    this.searchKey = "";
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleChange = e => {
    this.searchKey = e.target.value;
    // console.log(this.searchKey);
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <nav className="navbar" style={{ backgroundColor: "#c1666b" }}>
          <div className="container-fluid">
            <div className="navbar-header">
              <a
                className="navbar-brand"
                style={{ color: "#e4dfda", fontWeight: "bold" }}
                href="/newsfeeds"
                // onClick={() => {
                //   window.location.reload();
                // }}
              >
                <i className="fas fa-globe" /> {this.props.pagetitle}
              </a>
            </div>
            <a
              href="/newsfeeds"
              className="nav navbar-nav navbar-right"
              onClick={this.handleShow}
              style={{ cursor: "pointer" }}
            >
              <span
                className="navbar-brand fab fa-creative-commons"
                style={{ color: "#e4dfda", marginLeft: "5px" }}
              />
            </a>
            <form>
              <div className="searchForm">
                <div
                  style={
                    !this.props.show
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <input
                    className="navInput"
                    onChange={this.handleChange}
                    placeholder="New Search"
                    onKeyUp={e => {
                      e.preventDefault();
                      if (e.keyCode === 13) {
                        let x = document.getElementsByClassName("navOutput");
                        x[0].click();
                      }
                    }}
                  />
                  <button
                    className="navOutput"
                    onClick={e => {
                      e.preventDefault();
                      this.props.fetchNextPageNews(1, this.searchKey);
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </nav>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          style={{ backgroundColor: "rgba(228, 223, 218, 0.6)" }}
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#c1666b", color: "white" }}
          >
            <Modal.Title>NEWSFEEDS DISCLAIMER</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              backgroundColor: "#e4dfda",
              textAlign: "center",
              fontWeight: 700,
              color: "#4e4a4a"
            }}
          >
            <div>
              <i className="fas fa-globe" style={{ fontSize: "50px" }} />
              <div>NewsFeeds</div>
            </div>
            <br />
            <p>
              NewsFeeds id powered by <em>The Guardian - Open Platform</em>.
              <br />
              This app is for learning purpose only and code is available in{" "}
              <a
                href="https://github.com/ad08star/NewsFeeds"
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB.
              </a>
            </p>
            <p style={{ color: "#c1666b" }}>
              <em>
                {" "}
                PS: Checkout my other hobby project{" "}
                <a
                  href="https://ad08star.github.io/React_Multipurpose/#/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here <i className="fas fa-external-link-alt" />.
                </a>
              </em>
            </p>
          </Modal.Body>
          <Modal.Footer
            style={{ backgroundColor: "#c1666b", padding: "8px 15px" }}
          >
            <button
              type="button"
              className="btn btn-default"
              style={{
                backgroundColor: "#c1666b",
                border: "3px solid #d4b483",
                borderRadius: "8px",
                color: "white",
                fontWeight: "500",
                outline: "none"
              }}
              onClick={this.handleClose}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
