import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class FetchById extends Component {
  constructor(props) {
    super(props)
    this.state = {
       providerId:"",
       provider:null,
       loading: false,
       error: null,
       inputError:"",
    }
  }

  FetchProviderId = () => {
      const { providerId } = this.state;
      if (!providerId.trim()) {
        this.setState({ inputError: "Provider ID cannot be empty.", error: null });
        return;
      }

      this.setState({ loading: true, error: null, agent: null });
    
      const fetchProviderById = () =>
        new Promise((resolve, reject) => {
          fetch(`http://localhost:8080/provider/${providerId}`, {
            method: "GET",
            headers: {
              "X-Custom-Header": "validHeaderValue",
            },
          })
            .then((response) => {
              if (!response.ok) {
                if (response.status === 404) {
                  reject(new Error(`Provider with ID "${providerId}" not found.`));
                } else {
                  return response
                    .json()
                    .then((error) =>
                      reject(new Error(error.message || response.statusText))
                    );
                }
              }
              return response.json();
            })
            .then((data) => resolve(data.data))
            .catch((error) => reject(new Error(error.message || "Fetch failed.")));
        });
  
        fetchProviderById()
        .then((providerData) => {
          this.setState({
            provider: providerData,
            loading: false,
          });
        })
        .catch((error) => {
          this.setState({
            error: error.message,
            loading: false,
          });
        });
    };


  validateProvider = (e) => {
    const value = e.target.value;
    const regex = /^[Pp][0-9]{3,6}$/;
    const errorMessage = !regex.test(value) ? 'Provider ID should be of the format [Pxxx] where x is a digit.': '';
    this.setState({
      providerId: value,
      inputError: errorMessage,
    });
  };

  render() {
    const { providerId, provider, loading, error, inputError } = this.state;

    return (
      <div>
        <h1>Provider Details</h1>
        <div className="mb-3">
          <label htmlFor="providerId" className="form-label">Enter Provider ID:</label>
          <input
            type="text"
            id="providerId"
            className="form-control"
            value={providerId}
            onChange={this.validateProvider}
            placeholder="p001"
          />
          {inputError && <div className="text-danger">{inputError}</div>}
          <button className="btn btn-primary mt-2" onClick={this.FetchProviderId}>
            Fetch Provider
          </button>
        </div>

        {loading && <div>Loading provider...</div>}

        {error && <div className="text-danger">Error: {error}</div>}

        {provider && (
          <div className="table-responsive" style={{ maxHeight: '550px' }}>
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Provider ID</th>
                  <th>Name</th>
                  <th>Contact Number</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Street</th>
                  <th>City ID</th>
                  <th>State ID</th>
                  <th>Agent IDs</th>
                </tr>
              </thead>
              <tbody>
                <tr key={provider.providerId}>
                  <td>{provider.providerId}</td>
                  <td>{provider.providerName}</td>
                  <td>{provider.contactNumber}</td>
                  <td>{provider.email}</td>
                  <td>{provider.providerType}</td>
                  <td>{provider.street}</td>
                  <td>{provider.cityId}</td>
                  <td>{provider.stateId}</td>
                  <td>{provider.agentIds.length > 0 ? provider.agentIds.join(", ") : "No agents"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
