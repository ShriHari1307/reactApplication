import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class FetchAgentByName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agentNameError: "",
      agentFirstName: "",
      matchingAgents: [],
      validationError: "",
      selectedAgent: null,
      agentNotFoundVisible: false,
      enterAgentNameVisible: true,
      loading: false,
      error: null,
    };
    this.stateMapping = {
      1: {
        name: "Tamil Nadu",
        cities: {
          1: "Chennai",
          2: "Coimbatore",
          3: "Madurai",
          4: "Salem",
          5: "Trichy",
        },
      },
      2: {
        name: "West Bengal",
        cities: {
          6: "Kolkata",
          7: "Durgapur",
          8: "Siliguri",
          9: "Asansol",
          10: "Howrah",
        },
      },
      3: {
        name: "Karnataka",
        cities: {
          11: "Bangalore",
          12: "Mysore",
          13: "Hubli",
          14: "Mangalore",
          15: "Bellary",
        },
      },
      4: {
        name: "Maharashtra",
        cities: {
          16: "Mumbai",
          17: "Pune",
          18: "Nagpur",
          19: "Nashik",
          20: "Aurangabad",
        },
      },
    };
  }

  fetchAgentsByName = async () => {
    const { agentName } = this.state;
    if (!agentName.trim()) {
      this.setState({
        error: "Agent name cannot be empty.",
        matchingAgents: [],
      });
      return;
    }

    this.setState({ loading: true, error: null, matchingAgents: [] });

    try {
      const response = await axios.get(`http://localhost:8080/agents/search`, {
        params: { firstName: agentName },
      });

      if (response.data.length === 0) {
        this.setState({
          agentNotFoundVisible: true,
          enterAgentNameVisible: false,
        });

        setTimeout(() => {
          this.setState({
            agentNotFoundVisible: false,
            enterAgentNameVisible: true,
            loading: false,
          });
        }, 3000);
        return;
      }

      this.setState({
        matchingAgents: response.data,
        selectedAgent: null,
        agentNotFoundVisible: false,
        enterAgentNameVisible: false,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching agents:", error);
      this.setState({
        error: "An error occurred while fetching agents.",
        loading: false,
      });
    }
  };
  validateProviderName = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z ]+$/;

    // Update the state for providerName
    this.setState({
      agentFirstName: value,
      agentNameError:
        value && !regex.test(value)
          ? "Agent name cannot contain numbers or special characters"
          : "",
    });
  };

  getStateName = (stateId) => {
    return this.stateMapping[stateId]?.name || "Unknown State";
  };

  getCityName = (stateId, cityId) => {
    const state = this.stateMapping[stateId];
    if (!state) return "Unknown City";
    return state.cities[cityId] || "Unknown City";
  };

  getAgentStatus = (status) => {
    switch (status) {
      case 1:
        return "Active";
      case 2:
        return "Inactive";
      default:
        return "Unknown";
    }
  };

  selectAgent = (agent) => {
    this.setState({
      selectedAgent: agent,
      agentNotFoundVisible: false,
      enterAgentNameVisible: false,
    });
  };

  resetSearch = () => {
    this.setState({
      agentName: "",
      matchingAgents: [],
      selectedAgent: null,
      agentNotFoundVisible: false,
      enterAgentNameVisible: true,
      error: null,
    });
  };

  render() {
    const {
      agentName,
      matchingAgents,
      selectedAgent,
      agentNotFoundVisible,
      enterAgentNameVisible,
      loading,
      error,
    } = this.state;

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0 text-center">Fetch Agent Details</h4>
              </div>
              <div className="card-body">
                {enterAgentNameVisible && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="agentName" className="form-label">
                        Enter Agent Name:
                      </label>
                      <input
                        type="text"
                        id="agentName"
                        className="form-control"
                        value={agentName}
                        onChange={this.validateProviderName}
                        placeholder="e.g., John Doe"
                      />
                      {this.state.agentNameError && (
                        <div className="text-danger">
                          {this.state.agentNameError}
                        </div>
                      )}
                    </div>
                    <button
                      className="btn btn-primary w-100"
                      onClick={this.fetchAgentsByName}
                      disabled={loading}
                    >
                      {loading ? "Fetching..." : "Search Agents"}
                    </button>
                  </>
                )}

                {agentNotFoundVisible && (
                  <div className="alert alert-warning mt-4">
                    <strong>No agents found with the given name.</strong>
                  </div>
                )}

                {matchingAgents.length > 0 && (
                  <>
                    <div className="mt-4">
                      <h5>Matching Agents:</h5>
                      <ul className="list-group">
                        {matchingAgents.map((agent) => (
                          <li
                            key={agent.agentName}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            <span>
                              {agent.firstName} {agent.lastName}
                            </span>
                            <button
                              className="btn btn-info"
                              onClick={() => this.selectAgent(agent)}
                            >
                              View Details
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className="btn btn-secondary mt-3"
                      onClick={this.resetSearch}
                    >
                      Back to Search
                    </button>
                  </>
                )}
              </div>
            </div>

            {error && (
              <div className="alert alert-danger mt-4">
                <strong>Error:</strong> {error}
              </div>
            )}

            {selectedAgent && (
              <div className="card mt-4 shadow-sm">
                <div className="card-header bg-success text-white text-center">
                  <h5>
                    {selectedAgent.firstName} {selectedAgent.lastName}
                  </h5>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Contact:</strong> {selectedAgent.contact}
                    </li>
                    <li className="list-group-item">
                      <strong>Email:</strong> {selectedAgent.email}
                    </li>
                    <li className="list-group-item">
                      <strong>License Number:</strong>{" "}
                      {selectedAgent.licenseNumber}
                    </li>
                    <li className="list-group-item">
                      <strong>Date of Joining:</strong>{" "}
                      {selectedAgent.dateOfJoining.split("T")[0]}
                    </li>
                    <li className="list-group-item">
                      <strong>Agent Status:</strong>{" "}
                      {this.getAgentStatus(selectedAgent.status)}
                    </li>
                    <li className="list-group-item">
                      <strong>Street:</strong> {selectedAgent.street}
                    </li>
                    <li className="list-group-item">
                      <strong>City:</strong>{" "}
                      {this.getCityName(
                        selectedAgent.stateId,
                        selectedAgent.cityId
                      )}
                    </li>
                    <li className="list-group-item">
                      <strong>State:</strong>{" "}
                      {this.getStateName(selectedAgent.stateId)}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
