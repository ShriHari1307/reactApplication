import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

class NaviBar extends Component {
  render() {
    const { isLoggedIn, handleLogout } = this.props;

    return (
      <div>
        {/* Combined header section with full-width blue background */}
        <div className="bg-primary text-white">
          <div className="container-fluid d-flex justify-content-between align-items-center py-3">
            {/* Logo Section */}
            <div className="d-flex align-items-center" style={{ width: "100px" }}>
              <img src="logo.jpg" alt="logo" className="img-fluid" />
            </div>

            {/* Header Title Section */}
            <div className="text-center flex-grow-1">
              <h3 className="mb-0">Header</h3>
            </div>

            {/* Logout Button Section */}
            {isLoggedIn && (
              <div>
                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                  style={{ fontWeight: "bold" }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NaviBar;
