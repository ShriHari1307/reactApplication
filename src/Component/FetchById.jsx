import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class FetchProviderByName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerName: "",
      providerNameError: "",
      validationError: "",  // New state for validation error
      matchingProviders: [],
      selectedProvider: null,
      providerNotFoundVisible: false,
      enterProviderNameVisible: true,
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

  getStateName = (stateId) => {
    return this.stateMapping[stateId]?.name || "Unknown State";
  };

  getCityName = (stateId, cityId) => {
    const state = this.stateMapping[stateId];
    if (!state) return "Unknown City";
    return state.cities[cityId] || "Unknown City";
  };

  validateProviderName = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z ]+$/;
  
    // Update the state for providerName
    this.setState({
      providerName: value,
      providerNameError:
        value && !regex.test(value)
          ? "Provider name cannot contain numbers or special characters"
          : ""
    });
  };
  

  fetchProvidersByName = async () => {
    const { providerName, providerNameError } = this.state;
    
    // If there's an error in provider name, don't proceed with fetching data
    if (providerNameError || !providerName.trim()) {
      this.setState(
        {
          validationError: "Please fix the errors before searching.",  // Set validation error message
          matchingProviders: [],
        },
        () => {
          // After 2 seconds, clear the validation error message
          setTimeout(() => {
            this.setState({ validationError: "" });
          }, 2000);
        }
      );
      return;
    }
    
    // Proceed with fetching the provider data if no validation error
    this.setState({ loading: true, error: null, matchingProviders: [], validationError: "" });

    try {
      const response = await axios.get(
        `http://localhost:8080/provider/search`,
        {
          params: { name: providerName },
        }
      );

      if (response.data.length === 0) {
        this.setState({
          providerNotFoundVisible: true,
          enterProviderNameVisible: false,
        });

        setTimeout(() => {
          this.setState({
            providerNotFoundVisible: false,
            enterProviderNameVisible: true,
            loading: false,
          });
        }, 3000);
        return;
      }

      this.setState({
        matchingProviders: response.data,
        selectedProvider: null,
        providerNotFoundVisible: false,
        enterProviderNameVisible: false,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching providers:", error);
      this.setState({
        error: "An error occurred while fetching providers.",
        loading: false,
      });
    }
  };

  selectProvider = (provider) => {
    this.setState({
      selectedProvider: provider,
      providerNotFoundVisible: false,
      enterProviderNameVisible: false,
    });
  };

  resetToSearch = () => {
    this.setState({
      providerName: "",
      matchingProviders: [],
      selectedProvider: null,
      providerNotFoundVisible: false,
      enterProviderNameVisible: true,
      loading: false,
      error: null,
      validationError: "",  // Reset the validation error when resetting
    });
  };

  render() {
    const {
      providerName,
      matchingProviders,
      selectedProvider,
      providerNotFoundVisible,
      enterProviderNameVisible,
      loading,
      error,
      validationError,  // Get validation error state
    } = this.state;

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0 text-center">Fetch Provider Details</h4>
              </div>
              <div className="card-body">
                {validationError && (  // Display validation error card if exists
                  <div className="alert alert-danger">
                    <strong>{validationError}</strong>
                  </div>
                )}

                {enterProviderNameVisible && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="providerName" className="form-label">
                        Enter Provider Name:
                      </label>
                      <input
                        type="text"
                        id="providerName"
                        className="form-control"
                        value={providerName}
                        onChange={this.validateProviderName}
                        placeholder="e.g., ABC Insurance"
                      />
                      {this.state.providerNameError && (
                        <div className="text-danger">
                          {this.state.providerNameError}
                        </div>
                      )}
                    </div>
                    <button
                      className="btn btn-primary w-100"
                      onClick={this.fetchProvidersByName}
                      disabled={loading}
                    >
                      {loading ? "Fetching..." : "Search Providers"}
                    </button>
                  </>
                )}

                {providerNotFoundVisible && (
                  <div className="alert alert-warning mt-4">
                    <strong>No providers found with the given name.</strong>
                  </div>
                )}

                {matchingProviders.length > 0 && (
                  <div className="mt-4">
                    <h5>Matching Providers:</h5>
                    <ul className="list-group">
                      {matchingProviders.map((provider) => (
                        <li
                          key={provider.providerName}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <span>{provider.providerName}</span>
                          <button
                            className="btn btn-info"
                            onClick={() => this.selectProvider(provider)}
                          >
                            View Details
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(matchingProviders.length > 0 || selectedProvider) && (
                  <button
                    className="btn btn-secondary mt-3"
                    onClick={this.resetToSearch}
                  >
                    Back to Search
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="alert alert-danger mt-4">
                <strong>Error:</strong> {error}
              </div>
            )}

            {selectedProvider && (
              <div className="card mt-4 shadow-sm">
                <div className="card-header bg-success text-white text-center">
                  <h5>{selectedProvider.providerName}</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Provider Name:</strong>{" "}
                      {selectedProvider.providerName}
                    </li>
                    <li className="list-group-item">
                      <strong>Contact:</strong> {selectedProvider.contactNumber}
                    </li>
                    <li className="list-group-item">
                      <strong>Email:</strong> {selectedProvider.email}
                    </li>
                    <li className="list-group-item">
                      <strong>Provider Type:</strong>{" "}
                      {selectedProvider.providerType}
                    </li>
                    <li className="list-group-item">
                      <strong>Street:</strong> {selectedProvider.street}
                    </li>
                    <li className="list-group-item">
                      <strong>City:</strong>{" "}
                      {this.getCityName(
                        selectedProvider.stateId,
                        selectedProvider.cityId
                      )}
                    </li>
                    <li className="list-group-item">
                      <strong>State:</strong>{" "}
                      {this.getStateName(selectedProvider.stateId)}
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
