import React, { Component } from "react";

export default class FetchAllAgent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agents: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    const fetchAgents = () =>
      new Promise((resolve, reject) => {
        fetch("http://localhost:8080/agents", {
          method: "GET",
          headers: {
            "X-Custom-Header": "validHeaderValue",
          },
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((error) => reject(error.message));
            }
            return response.json();
          })
          .then((data) => resolve(data.data))
          .catch((error) => reject(error.message));
      });
      fetchAgents()
      .then((data) => {
        this.setState({
          agents: data,
          loading: false,
        });
      })
      .catch((errorMessage) => {
        this.setState({
          error: errorMessage,
          loading: false,
        });
      });
  }

  render() {
    const { agents, loading, error } = this.state;

    if (loading) {
      return <div className="text-center mt-5"> Loading agents</div>;
    }

    if (error) {
      return <div className="text-danger text-center mt-5">Error: {error}</div>;
    }
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">All Agents</h2>
        <div
          className="card-container"
          style={{
            maxHeight: "600px",
            overflowY: "scroll",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <div className="row">
            {agents.map((agent) => (
              <div className="col-md-6 col-lg-4 mb-4" key={agent.agentId}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-primary">
                      {agent.firstName} - {agent.lastName}
                    </h5>
                    <p className="card-text">
                      <strong>Provider ID:</strong> {agent.agentId}
                    </p>
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
                      <strong>Date Of Joining:</strong>{" "}
                      {agent.dateOfJoining.split("T")[0]}
                    </p>

                    <p className="card-text">
                      <strong>Agent Status:</strong> {agent.status}
                    </p>
                    <p className="card-text">
                      <strong>Street:</strong> {agent.street}
                    </p>
                    <p className="card-text">
                      <strong>City ID:</strong> {agent.cityId}
                    </p>
                    <p className="card-text">
                      <strong>State ID:</strong> {agent.stateId}
                    </p>
                    <p className="card-text">
                      <strong>Assigned to Providers:</strong>
                      {agent.providerIds.length > 0 ? (
                        <ul>
                          {agent.providerIds.map((providerId, index) => (
                            <li key={index}>{providerId}</li>
                          ))}
                        </ul>
                      ) : (
                        "No Providers"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
