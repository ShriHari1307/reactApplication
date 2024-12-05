import React, { Component } from "react";

export default class FetchAllAgent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agents: [],
      providersMap: {}, // Map to store providerId -> providerName
      loading: true,
      error: null,
    };

    this.stateMapping = {
      1: {
        name: "Tamil Nadu",
        cities: {
          "1": "Chennai",
          "2": "Coimbatore",
          "3": "Madurai",
          "4": "Salem",
          "5": "Trichy",
        },
      },
      2: {
        name: "West Bengal",
        cities: {
          "6": "Kolkata",
          "7": "Durgapur",
          "8": "Siliguri",
          "9": "Asansol",
          "10": "Howrah",
        },
      },
      3: {
        name: "Karnataka",
        cities: {
          "11": "Bangalore",
          "12": "Mysore",
          "13": "Hubli",
          "14": "Mangalore",
          "15": "Bellary",
        },
      },
      4: {
        name: "Maharashtra",
        cities: {
          "16": "Mumbai",
          "17": "Pune",
          "18": "Nagpur",
          "19": "Nashik",
          "20": "Aurangabad",
        },
      },
    };
  }

  componentDidMount() {
    this.fetchAgentsAndProviders();
  }

  fetchAgentsAndProviders = async () => {
    try {
      // Fetch agents
      const agentsResponse = await fetch("http://localhost:8080/agents", {
        method: "GET",
        headers: { "X-Custom-Header": "validHeaderValue" },
      });
      if (!agentsResponse.ok) throw new Error("Failed to fetch agents");
      const agentsData = await agentsResponse.json();

      // Fetch providers
      const providersResponse = await fetch("http://localhost:8080/provider", {
        method: "GET",
        headers: { "X-Custom-Header": "validHeaderValue" },
      });
      if (!providersResponse.ok) throw new Error("Failed to fetch providers");
      const providersData = await providersResponse.json();

      // Create a map of provider IDs to provider names
      const providersMap = providersData.data.reduce((acc, provider) => {
        acc[provider.providerId] = provider.providerName;
        return acc;
      }, {});

      this.setState({
        agents: agentsData.data,
        providersMap,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
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

  getAgentStatus = (status) => {
    switch (status) {
      case 1:
        return "Active";
      case 2:
        return "Inactive";
      default:
        return "Unknown"; // For unexpected status codes
    }
  };

  render() {
    const { agents, providersMap, loading, error } = this.state;

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
        <h2 className="text-center mb-4">All Agents</h2>

        <div className="row g-4" style={{ maxHeight: "700px", overflowY: "auto" }}>
          {agents.map((agent) => (
            <div className="col-md-6 col-lg-4" key={agent.agentId}>
              <div className="card shadow-lg rounded-4 border-0 overflow-hidden">
                <div
                  className="card-header text-white"
                  style={{
                    background: "linear-gradient(135deg, #6f42c1, #007bff)",
                    borderRadius: "0.25rem 0.25rem 0 0",
                  }}
                >
                  <h5 className="card-title">
                    {agent.firstName} {agent.lastName}
                  </h5>
                </div>
                <div className="card-body">
                  {/* <p className="card-text">
                    <strong>Agent ID:</strong> {agent.agentId}
                  </p> */}
                  <p className="card-text">
                    <strong>Contact:</strong> {agent.contact}
                  </p>
                  <p className="card-text">
                    <strong>Email:</strong> {agent.email}
                  </p>
                  <p className="card-text">
                    <strong>License Number:</strong> {agent.licenseNumber}
                  </p>
                  <p className="card-text">
                    <strong>Date Of Joining:</strong> {agent.dateOfJoining.split("T")[0]}
                  </p>

                  <p className="card-text">
                    <strong>Agent Status:</strong> {this.getAgentStatus(agent.status)}
                  </p>
                  <p className="card-text">
                    <strong>Street:</strong> {agent.street}
                  </p>
                  <p className="card-text">
                    <strong>City:</strong> {this.getCityName(agent.stateId, agent.cityId)}
                  </p>
                  <p className="card-text">
                    <strong>State:</strong> {this.getStateName(agent.stateId)}
                  </p>

                  <div className="mt-3">
                    <strong>Assigned to Providers:</strong>
                    {agent.providerIds.length > 0 ? (
                      <div className="list-group mt-2">
                        {agent.providerIds.map((providerId, index) => (
                          <div
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            <span className="badge bg-dark text-white">
                              {providersMap[providerId] || "Unknown Provider"}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">No Providers</p>
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
