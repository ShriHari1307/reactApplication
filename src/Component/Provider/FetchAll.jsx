import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default class FetchAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providers: [],
      agentsMap: {},
      loading: true,
      error: null,
    };

    this.stateMapping = {
      1: {
        name: "Tamil Nadu",
        cities: {
          1: "Chennai", 2: "Coimbatore", 3: "Madurai", 4: "Salem", 5: "Trichy",
        },
      },
      2: {
        name: "West Bengal",
        cities: {
          6: "Kolkata", 7: "Durgapur", 8: "Siliguri", 9: "Asansol", 10: "Howrah",
        },
      },
      3: {
        name: "Karnataka",
        cities: {
          11: "Bangalore", 12: "Mysore", 13: "Hubli", 14: "Mangalore", 15: "Bellary",
        },
      },
      4: {
        name: "Maharashtra",
        cities: {
          16: "Mumbai", 17: "Pune", 18: "Nagpur", 19: "Nashik", 20: "Aurangabad",
        },
      },
    };
  }

  componentDidMount() {
    this.fetchProvidersAndAgents();
  }

  fetchProvidersAndAgents = async () => {
    try {
      // Fetch providers
      const providersResponse = await axios.get("http://localhost:8080/provider", {
        headers: { "X-Custom-Header": "validHeaderValue" }
      });

      // Fetch all agents
      const agentsResponse = await axios.get("http://localhost:8080/agents", {
        headers: { "X-Custom-Header": "validHeaderValue" }
      });

      // Create a map of agent IDs to agent details
      const agentsMap = agentsResponse.data.data.reduce((acc, agent) => {
        acc[agent.agentId] = agent;
        return acc;
      }, {});

      this.setState({
        providers: providersResponse.data.data,
        agentsMap: agentsMap,
        loading: false
      });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false
      });
    }
  };

  getStateName = (stateId) => {
    return this.stateMapping[stateId]?.name || "Unknown State";
  };

  getCityName = (stateId, cityId) => {
    const state = this.stateMapping[stateId];
    if (!state) return "Unknown City";
    return state.cities[cityId] || "Unknown City";
  };

  renderAgents = (agentIds) => {
    const { agentsMap } = this.state;
    return agentIds.map((agentId, index) => {
      const agent = agentsMap[agentId];
      return agent ? (
        <div
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span className="badge bg-dark text-white">
             {agent.firstName} {agent.lastName}
          </span>
        </div>
      ) : null;
    });
  };

  render() {
    const { providers, loading, error } = this.state;

    if (loading) {
      return (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return <div className="text-danger text-center mt-5">Error: {error}</div>;
    }

    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">All Provider </h2>

        <div className="row g-4" style={{ maxHeight: "700px", overflowY: "auto" }}>
          {providers.map((provider) => (
            <div className="col-md-6 col-lg-4" key={provider.providerId}>
              <div className="card shadow-lg rounded-4 border-0 overflow-hidden">
                <div
                  className="card-header text-white"
                  style={{
                    background: "linear-gradient(135deg, #6f42c1, #007bff)",
                    borderRadius: "0.25rem 0.25rem 0 0",
                  }}
                >
                  <h5 className="card-title">{provider.providerName}</h5>
                </div>
                <div className="card-body">
                  {/* <p className="card-text">
                    <strong>Provider ID:</strong> {provider.providerId}
                  </p> */}
                  <p className="card-text">
                    <strong>Contact:</strong> {provider.contactNumber}
                  </p>
                  <p className="card-text">
                    <strong>Email:</strong> {provider.email}
                  </p>
                  <p className="card-text">
                    <strong>Type:</strong> {provider.providerType}
                  </p>
                  <p className="card-text">
                    <strong>Street:</strong> {provider.street}
                  </p>
                  <p className="card-text">
                    <strong>State:</strong> {this.getStateName(provider.stateId)}
                  </p>
                  <p className="card-text">
                    <strong>City:</strong> {this.getCityName(provider.stateId, provider.cityId)}
                  </p>

                  <div className="mt-3">
                    <strong>Agents:</strong>
                    {provider.agentIds.length > 0 ? (
                      <div className="list-group mt-2">
                        {this.renderAgents(provider.agentIds)}
                      </div>
                    ) : (
                      <p className="text-muted">No agents assigned</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}