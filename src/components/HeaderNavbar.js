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
                href="/#"
                onClick={() => window.location.reload()}
              >
                <i class="fas fa-globe" /> {this.props.pagetitle}
              </a>
            </div>
            <a
              href="/#"
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
                {/* <input
                  className="formInput"
                  type="text"
                  name="search"
                  placeholder="Search.."
                  onChange={this.handleChange}
                />
                <input
                  className="formButton"
                  type="button"
                  value="Search"
                  onClick={() => console.log(this.searchKey)}
                /> */}

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
                  />
                  <button
                    className="navOutput"
                    onClick={e =>
                      this.props.fetchNextPageNews(1, this.searchKey)
                    }
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
            <Modal.Title>NOT SO IMPORTANT DISCLAIMER</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              backgroundColor: "#e4dfda",
              textAlign: "center",
              fontWeight: 700,
              color: "#4e4a4a"
            }}
          >
            <div>Something</div>
            <br />
            <p>
              HAPPY MONKEYS is <em>NOT</em> a registered Trademark. <br />
              So feel free to use it as you see fit.
            </p>
            <p style={{ color: "#c1666b" }}>
              <em>PS: This is just an example of MODAL WINDOW.</em>
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
