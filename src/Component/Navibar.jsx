import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class NaviBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogoutModal: false,
    };
  }

  toggleLogoutModal = () => {
    this.setState({ showLogoutModal: !this.state.showLogoutModal });
  };

  render() {
    const { isLoggedIn, handleLogout } = this.props;
    const { showLogoutModal } = this.state;

    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{
            backgroundColor: "#007BFF",
            transition: "background-color 0.3s ease",
          }}
        >
          <div className="container-fluid">
            <Link to="/home" className="navbar-brand d-flex align-items-center">
              <img
                src="logo.jpg"
                alt="logo"
                className="img-fluid"
                style={{
                  maxWidth: "80px",
                  height: "auto",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar-nav ms-auto">
                <Link
                  to="/home"
                  className="nav-link text-white"
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#FFD700")}
                  onMouseLeave={(e) => (e.target.style.color = "white")}
                >
                  Home
                </Link>
              </div>
            </div>

            <div className="d-flex">
              {isLoggedIn && (
                <button
                  className="btn btn-danger ms-3"
                  onClick={this.toggleLogoutModal}
                  style={{
                    fontWeight: "bold",
                    padding: "10px 25px",
                    borderRadius: "50px",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#d9534f"; 
                    e.target.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#ff4d4d"; 
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Logout Modal */}
        {showLogoutModal && (
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title">Confirm Logout</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={this.toggleLogoutModal}
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <p>Are you sure you want to logout?</p>
                  <img
                    src="logout.png"
                    alt="logout"
                    style={{
                      width: "80px",
                      marginBottom: "15px",
                    }}
                  />
                </div>
                <div className="modal-footer justify-content-center">
                  <button
                    className="btn btn-secondary"
                    onClick={this.toggleLogoutModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.toggleLogoutModal();
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NaviBar;
