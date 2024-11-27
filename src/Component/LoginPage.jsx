import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      successMessage: "",
      isSignUp: false,
    };
  }

  handleInputChange = (event) => {
    console.log("Inside on change")
    const { id, value } = event.target;
    this.setState({
      [id]: value,
    });
  };

  toggleForm = () => {
    this.setState({
      isSignUp: !this.state.isSignUp,
      errorMessage: "",
      successMessage: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password, isSignUp } = this.state;

    if (!username || !password) {
      this.setState({ errorMessage: "Both fields are required" });
      return;
    }

    if (isSignUp) {
      axios
        .post("http://localhost:8080/Authentication/register", {
          userName: username,
          password: password,
        })
        .then(() => {
          this.setState({
            successMessage: "User created successfully. Please log in.",
            errorMessage: "",
          });
        })
        .catch((error) => {
          this.setState({
            errorMessage: error.response?.data?.response || "Registration failed",
            successMessage: "",
          });
        });
    } else {
      axios
        .post("http://localhost:8080/Authentication/login", {
          userName: username,
          password: password,
        })
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              successMessage: "Login Successful!",
              errorMessage: "",
            });
            this.props.onLogin();
            window.location.href = "/home";
          }
        })
        .catch((error) => {
          this.setState({
            errorMessage: error.response?.data?.response || "Authentication failed",
            successMessage: "",
          });
        });
    }
  };

  render() {
    const { username, password, errorMessage, successMessage, isSignUp } =
      this.state;

    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          background: "linear-gradient(to right, #007bff, #6c757d)",
          color: "#fff",
        }}
      >
        <div
          className="card shadow-lg"
          style={{
            width: "25rem",
            padding: "2rem",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            color: "#000",
          }}
        >
          <div className="text-center mb-3">
            <img
              src="loginimage.png"
              alt="Logo"
              style={{
                width: "100px",
                height: "100px",
                marginBottom: "10px",
              }}
            />
            <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={this.handleInputChange}
                style={{ borderRadius: "5px" }}
              />
              <label htmlFor="username">Username</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={this.handleInputChange}
                style={{ borderRadius: "5px" }}
              />
              <label htmlFor="password">Password</label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              style={{
                backgroundColor: isSignUp ? "#28a745" : "#007bff",
                borderRadius: "5px",
              }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          {errorMessage && (
            <div
              className="alert alert-danger text-center"
              style={{
                fontSize: "0.9rem",
                borderRadius: "5px",
              }}
            >
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div
              className="alert alert-success text-center"
              style={{
                fontSize: "0.9rem",
                borderRadius: "5px",
              }}
            >
              {successMessage}
            </div>
          )}

          <div className="text-center mt-3">
            <button
              className="btn btn-link"
              onClick={this.toggleForm}
              style={{
                fontSize: "0.9rem",
                textDecoration: "none",
                color: "#007bff",
              }}
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
