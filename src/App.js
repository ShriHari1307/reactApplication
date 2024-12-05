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
import Addprovider from "./Component/Provider/Addprovider";
import FetchById from "./Component/Provider/FetchById";
import FetchAll from "./Component/Provider/FetchAll";
import HomePage from "./Component/HomePage";
import DeleteProvider from "./Component/Provider/DeleteProvider";
import AdComponent from "./Component/AdComponent";
import PageNotFound from "./Component/PageNotFound";
import AddAgent from "./Component/Agents/AddAgent";
import FetchAllAgent from "./Component/Agents/FetchAllAgent";
import FetchAgentById from "./Component/Agents/FetchAgentById";
import LandingPage from "./Component/LandingPage";
import LoginPage from "./Component/LoginPage";
import DeleteAgent from "./Component/Agents/DeleteAgent";
import CustomQueries from "./Component/CustomQueries";
import UpdateProvByName from "./Component/Provider/UpdateProvByName";
import UpdateAgentByName from "./Component/Agents/UpdateAgentByName";
import {
  FaPlus,
  FaIdCard,
  FaTrash,
  FaEdit,
  FaUserPlus,
  FaUsers,
  FaCogs,
} from "react-icons/fa";
// import UpdateProvByName from "./Component/UpdateProvByName";

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
                    style={{ maxheight: "760px", overflowY: "auto" }}
                  >
                    <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                      <li className="nav-item mb-3">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "nav-link text-white p-3 rounded-3 active-link"
                              : "nav-link text-white p-3 rounded-3"
                          }
                          to="/addProvider"
                        >
                          <FaPlus style={{ marginRight: "10px" }} /> Add
                          Provider
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "nav-link text-white p-3 rounded-3 active-link"
                              : "nav-link text-white p-3 rounded-3"
                          }
                          to="/fetchById"
                        >
                          <FaIdCard style={{ marginRight: "10px" }} /> Fetch Provider By
                          Name
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "nav-link text-white p-3 rounded-3 active-link"
                              : "nav-link text-white p-3 rounded-3"
                          }
                          to="/fetchAll"
                        >
                          <FaUsers style={{ marginRight: "10px" }} /> Fetch All Providers
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "nav-link text-white p-3 rounded-3 active-link"
                              : "nav-link text-white p-3 rounded-3"
                          }
                          to="/deleteProvider"
                        >
                          <FaTrash style={{ marginRight: "10px" }} /> Delete
                          Provider
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "nav-link text-white p-3 rounded-3 active-link"
                              : "nav-link text-white p-3 rounded-3"
                          }
                          to="/updateProvider"
                        >
                          <FaEdit style={{ marginRight: "10px" }} /> Update
                          Provider
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "nav-link text-white p-3 rounded-3 active-link"
                              : "nav-link text-white p-3 rounded-3"
                          }
                          to="/addAgent"
                        >
                          <FaUserPlus style={{ marginRight: "10px" }} /> Add
                          Agent
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "nav-link text-white p-3 rounded-3 active-link"
                              : "nav-link text-white p-3 rounded-3"
                          }
                          to="/fetchByAgentId"
                        >
                          <FaIdCard style={{ marginRight: "10px" }} /> Fetch Agent By
                           Name
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "nav-link text-white p-3 rounded-3 active-link"
                              : "nav-link text-white p-3 rounded-3"
                          }
                          to="/fetchAllAgent"
                        >
                          <FaUsers style={{ marginRight: "10px" }} /> Fetch All
                          Agents
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "nav-link text-white p-3 rounded-3 active-link"
                              : "nav-link text-white p-3 rounded-3"
                          }
                          to="/deleteAgent"
                        >
                          <FaTrash style={{ marginRight: "10px" }} /> Delete
                          Agent
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "nav-link text-white p-3 rounded-3 active-link"
                              : "nav-link text-white p-3 rounded-3"
                          }
                          to="/updateAgent"
                        >
                          <FaEdit style={{ marginRight: "10px" }} /> Update
                          Agent
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "nav-link text-white p-3 rounded-3 active-link"
                              : "nav-link text-white p-3 rounded-3"
                          }
                          to="/customQuery"
                        >
                          <FaCogs style={{ marginRight: "10px" }} /> Custom
                          Query
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
                      {/* <Route path="/bulkInsert" element={<BulkInsert />} /> */}
                      <Route
                        path="/updateProvider"
                        element={<UpdateProvByName />}
                      />
                      <Route
                        path="/fetchAllAgent"
                        element={<FetchAllAgent />}
                      />
                      <Route
                        path="/fetchByAgentId"
                        element={<FetchAgentById />}
                      />
                      <Route path="/addAgent" element={<AddAgent />} />
                      <Route path="/updateAgent" element={<UpdateAgentByName />} />
                      <Route
                        path="/deleteProvider"
                        element={<DeleteProvider />}
                      />
                      <Route path="/deleteAgent" element={<DeleteAgent />} />
                      <Route path="/customQuery" element={<CustomQueries />} />
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </Col>

                  {/* Ads */}
                  <Col xs={2} className="bg-dark">
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
