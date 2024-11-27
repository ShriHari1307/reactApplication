import React, { Component } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import NaviBar from "./Component/Navibar";
import Footer from "./Component/Footer";
import Addprovider from "./Component/Addprovider";
import FetchById from "./Component/FetchById";
import FetchAll from "./Component/FetchAll";
import HomePage from "./Component/HomePage";
import DeleteProvider from "./Component/DeleteProvider";
import AdComponent from "./Component/AdComponent";
import PageNotFound from "./Component/PageNotFound";
import AddAgent from "./Component/AddAgent";
import FetchAllAgent from "./Component/FetchAllAgent";
import FetchAgentById from "./Component/FetchAgentById";
import LandingPage from "./Component/LandingPage";
import LoginPage from "./Component/LoginPage";
import UpdateProvider from "./Component/UpdateProvider";
import DeleteAgent from "./Component/DeleteAgent";
import AgentUpdate from "./Component/UpdateAgent";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providersList: [],
      isLoggedIn: localStorage.getItem("isLoggedIn") === "true", 
    };
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
    localStorage.setItem("isLoggedIn", "true");
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
    localStorage.removeItem("isLoggedIn"); 
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <Router>
        <div
          className="app-container"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isLoggedIn && (
            <NaviBar isLoggedIn={isLoggedIn} handleLogout={this.handleLogout} />
          )}

          <Container
            fluid
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              flexGrow: 1,
              backgroundColor: isLoggedIn ? "lightgray" : "white",
            }}
          >
            <Row className="flex-grow-1">
              {isLoggedIn ? (
                <>
                  <Col
                    xs={12}
                    md={3}
                    lg={2}
                    className="bg-dark text-white p-4"
                    style={{ height: "700px", overflowY: "auto" }}
                  >
                    <ul>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/addProvider"
                        >
                          Add Provider
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/fetchById"
                        >
                          Fetch By Id
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/fetchAll"
                        >
                          Fetch All
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/deleteProvider"
                        >
                          Delete Provider
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/updateProvider"
                        >
                          update Provider
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/addAgent"
                        >
                          Add Agent
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/fetchAllAgent"
                        >
                          Fetch All Agents
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/fetchByAgentId"
                        >
                          Fetch By Agent Id
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/deleteAgent"
                        >
                          Delete Agent
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/updateAgent"
                        >
                          Update Agent
                        </NavLink>
                      </li>
                    </ul>
                  </Col>

                  {/* Main Content */}
                  <Col xs={8} style={{ backgroundColor: "white" }}>
                    <Routes>
                      <Route path="/addProvider" element={<Addprovider />} />
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/fetchById" element={<FetchById />} />
                      <Route path="/fetchAll" element={<FetchAll />} />
                      <Route path="/updateProvider" element={<UpdateProvider />} />
                      <Route path="/fetchAllAgent" element={<FetchAllAgent />} />
                      <Route path="/fetchByAgentId" element={<FetchAgentById />} />
                      <Route path="/addAgent" element={<AddAgent />} />
                      <Route path="/updateAgent" element={<AgentUpdate />} />
                      <Route path="/deleteProvider" element={<DeleteProvider />} />
                      <Route path="/deleteAgent" element={<DeleteAgent />} />
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </Col>

                  {/* Ads */}
                  <Col xs={2} style={{ backgroundColor: "brown", color: "white" }}>
                    <AdComponent />
                  </Col>
                </>
              ) : (
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route
                    path="/login"
                    element={<LoginPage onLogin={this.handleLogin} />}
                  />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              )}
            </Row>
          </Container>

          {isLoggedIn && <Footer />}
        </div>
      </Router>
    );
  }
}
