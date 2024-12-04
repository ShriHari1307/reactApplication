import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div
        className="d-flex align-items-center"
        style={{
          height: "70px",
          backgroundColor: "#343a40", // Dark gray background
          color: "#f8f9fa", // Light gray text
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        <p>&copy; 2024 Insurance Agent Management System. All rights reserved.</p>
      </div>
    );
  }
}
