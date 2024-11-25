import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class FetchAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providers: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    const fetchProviders = () =>
      new Promise((resolve, reject) => {
        fetch("http://localhost:8080/provider", {
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
      fetchProviders()
      .then((data) => {
        this.setState({
          providers: data,
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
    const { providers, loading, error } = this.state;

    if (loading) {
      return <div className="text-center mt-5">Loading providers...</div>;
    }

    if (error) {
      return <div className="text-danger text-center mt-5">Error: {error}</div>;
    }

    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">All Providers</h2>
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
            {providers.map((provider) => (
              <div className="col-md-6 col-lg-4 mb-4" key={provider.providerId}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-primary">
                      {provider.providerName}
                    </h5>
                    <p className="card-text">
                      <strong>Provider ID:</strong> {provider.providerId}
                    </p>
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
                      <strong>City ID:</strong> {provider.cityId}
                    </p>
                    <p className="card-text">
                      <strong>State ID:</strong> {provider.stateId}
                    </p>
                    <p className="card-text">
                      <strong>Agents:</strong>
                      {provider.agentIds.length > 0 ? (
                        <ul>
                          {provider.agentIds.map((agentId, index) => (
                            <li key={index}>{agentId}</li>
                          ))}
                        </ul>
                      ) : (
                        "No agents"
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
