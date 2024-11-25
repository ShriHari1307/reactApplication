import React, { Component } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Navibar from "./Component/Navibar";
import Footer from "./Component/Footer";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Addprovider from "./Component/Addprovider";
import FetchById from "./Component/FetchById";
import FetchAll from "./Component/FetchAll";
import DeleteProvider from "./Component/DeleteProvider";
import AdComponent from "./Component/AdComponent";
import PageNotFound from "./Component/PageNotFound";
import HomePage from "./Component/HomePage";
import AddAgent from "./Component/AddAgent";
import FetchAllAgent from "./Component/FetchAllAgent";
import FetchAgentById from "./Component/FetchAgentById";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providersList: [],
    };
  }

  updateProviderList = (newProviderList) => {
    if (Array.isArray(newProviderList)) {
      this.setState({ providersList: newProviderList });
    } else {
      console.error("newProviderList is not an array:", newProviderList);
    }
  };

  render() {
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
          <Container
            fluid
            style={{ paddingLeft: 0, paddingRight: 0, flexGrow: 1 }}
          >
            <Row>
              <Navibar />
            </Row>
            <Row
              className="flex-grow-1"
              style={{ backgroundColor: "lightgray", height: "84vh" }}
            >
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
                      activeClassName="active"
                      className="nav-link text-white p-3 rounded-3"
                      to="/addProvider"
                    >
                      Add Provider
                    </NavLink>
                  </li>
                  <li className="nav-item mb-3">
                    <NavLink
                      activeClassName="active"
                      className="nav-link text-white p-3 rounded-3"
                      to="/fetchById"
                    >
                      Fetch By Id
                    </NavLink>
                  </li>
                  <li className="nav-item mb-3">
                    <NavLink
                      activeClassName="active"
                      className="nav-link text-white p-3 rounded-3"
                      to="/fetchAll"
                    >
                      Fetch All
                    </NavLink>
                  </li>
                  <li className="nav-item mb-3">
                    <NavLink
                      activeClassName="active"
                      className="nav-link text-white p-3 rounded-3"
                      to="/deleteProvider"
                    >
                      Delete Provider
                    </NavLink>
                  </li>
                  <li className="nav-item mb-3">
                    <NavLink
                      activeClassName="active"
                      className="nav-link text-white p-3 rounded-3"
                      to="/addAgent"
                    >
                      Add Agent
                    </NavLink>
                  </li>

                  <li className="nav-item mb-3">
                    <NavLink
                      activeClassName="active"
                      className="nav-link text-white p-3 rounded-3"
                      to="/fetchAllAgent"
                    >
                      Fetch All Agents
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeClassName="active"
                      className="nav-link text-white p-3 rounded-3"
                      to="/fetchByAgentId"
                    >
                      Fetch By Agent Id
                    </NavLink>
                  </li>
                </ul>
              </Col>

              <Col xs={8} style={{ backgroundColor: "white" }}>
                <Routes>
                  <Route path="/addProvider" element={ <Addprovider/>} />
                  <Route path="/fetchById" element={<FetchById />} />
                  <Route path="/fetchAll" element={<FetchAll />} />
                  <Route path="/fetchAllAgent" element={<FetchAllAgent />} />
                  <Route path="/fetchByAgentId" element={<FetchAgentById />} />
                  <Route path="/addAgent" element={<AddAgent />} />
                  <Route path="/deleteProvider" element={<DeleteProvider />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Col>
              <Col xs={2} style={{ backgroundColor: "brown", color: "white" }}>
                <AdComponent />
              </Col>
            </Row>
            <Row>
              <Footer />
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}
