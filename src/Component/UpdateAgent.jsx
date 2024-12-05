import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class UpdateAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agentId: "",
      firstName: "",
      lastName: "",
      contact: "",
      licenseNumber: "",
      dateOfJoining: "",
      street: "",
      email: "",
      cityId: "",
      stateId: "",
      status: "",
      providerIds: [],
      providers: [],
      availableProviders: [],
      selectedProviders: [],
      loading: false,
      error: null,
      inputError: "",
      formVisible: false,
      updateSuccess: "",
      successVisible: false,
      agentIdError: "",
      agentNameError: "",
      contactNumberError: "",
      emailError: "",
      streetError: "",
      cityIdError: "",
      stateIdError: "",
      licenseNumberError: "",
      dateOfJoiningError: "",
      AgentStatusError: "",
      cities: [],
      validationError:"",
    };
  }

  cityMapping = {
    1: [
      { id: "1", name: "Chennai" },
      { id: "2", name: "Coimbatore" },
      { id: "3", name: "Madurai" },
      { id: "4", name: "Salem" },
      { id: "5", name: "Trichy" },
    ],
    2: [
      { id: "6", name: "Kolkata" },
      { id: "7", name: "Durgapur" },
      { id: "8", name: "Siliguri" },
      { id: "9", name: "Asansol" },
      { id: "10", name: "Howrah" },
    ],
    3: [
      { id: "11", name: "Bangalore" },
      { id: "12", name: "Mysore" },
      { id: "13", name: "Hubli" },
      { id: "14", name: "Mangalore" },
      { id: "15", name: "Bellary" },
    ],
    4: [
      { id: "16", name: "Mumbai" },
      { id: "17", name: "Pune" },
      { id: "18", name: "Nagpur" },
      { id: "19", name: "Nashik" },
      { id: "20", name: "Aurangabad" },
    ],
  };

  componentDidMount() {
    fetch("http://localhost:8080/provider")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          providers: data.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: "failed to fetch Providers",
          loading: false,
        });
      });
  }

  handleCheckboxChange = (providerId) => {
    const { selectedProviders } = this.state;
    const isSelected = selectedProviders.includes(providerId);

    this.setState({
      selectedProviders: isSelected
        ? selectedProviders.filter((id) => id !== providerId)
        : [...selectedProviders, providerId],
    });
  };

  handleStateChange = (e) => {
    const stateId = e.target.value;
    this.setState({
      stateId,
      cityId: "",
      cities: this.cityMapping[stateId] || [],
    });
  };

  validateAgentFirstName = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z ]+$/;
    this.setState({
      firstName: value,
      firstNameError:
        value && !regex.test(value)
          ? "Agent name cannot contain numbers or special characters"
          : "",
    });
  };

  validateAgentLastName = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z ]+$/;
    this.setState({
      lastName: value,
      lastNameError:
        value && !regex.test(value)
          ? "Agent name cannot contain numbers or special characters"
          : "",
    });
  };

  handleSelectChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    this.setState({ selectedProviders: selectedOptions });
  };

  validateAgentId = (e) => {
    const value = e.target.value;
    const regex = /^[Aa][0-9]{3,6}$/;
    this.setState({
      agentId: value,
      agentIdError:
        value && !regex.test(value)
          ? "Agent id should be of the format [Axxx] where x is a digit"
          : "",
    });
  };

  validateStreet = (e) => {
    const value = e.target.value;
    this.setState({
      street: value,
      streetError: !value ? "Street cannot be empty" : "",
    });
  };

  validateCityId = (e) => {
    const value = e.target.value;
    this.setState({
      cityId: value,
      cityIdError: !value ? "City must be selected" : "",
    });
  };

  validateAgentStatus = (e) => {
    const value = e.target.value;
    this.setState({
      status: value,
      AgentStatusError: !value ? "AgentStatus must be selected" : "",
    });
  };

  validateStateId = (e) => {
    const value = e.target.value;
    this.setState({
      stateId: value,
      stateIdError: !value ? "State must be selected" : "",
    });
  };

  validateContactNumber = (e) => {
    const value = e.target.value;
    const startsWithValidDigit = /^[986]/.test(value);
    const regex = /^[986][0-9]{9}$/;
    const containsLetter = /[a-zA-Z]/.test(value);
    let errorMessage = "";
  
    if (value && containsLetter) {
      errorMessage = "Phone number cannot contain letters";
    } else if (value && value.length > 10) {
      errorMessage = "Phone number cannot exceed 10 digits";
    } else if (value && !startsWithValidDigit) {
      errorMessage = "Mobile number must start with 9, 8, or 6";
    } else if (value && !regex.test(value)) {
      errorMessage = "Contact Number must be 10 digits";
    }
  
    this.setState({
      contact: value,
      contactNumberError: errorMessage,
    });
  };


  validateLicenseNumber = (e) => {
    const value = e.target.value;
    const regex = /^LIC\d{3,10}$/;
    this.setState({
      licenseNumber: value,
      licenseNumberError:
        value && !regex.test(value)
          ? "License number must be of the format e.g (LIC234)"
          : "",
    });
  };

  validateEmail = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    this.setState({
      email: value,
      emailError: value && !regex.test(value) ? "Email is not valid" : "",
    });
  };

  validateDateOfJoining = (e) => {
    const dateOfJoining = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0];

    if (dateOfJoining > currentDate) {
      this.setState({
        dateOfJoining,
        dateOfJoiningError: "Date of Joining cannot be in the future.",
      });
    } else {
      this.setState({
        dateOfJoining,
        dateOfJoiningError: "",
      });
    }
  };

  FetchAgentById = () => {
    const { agentId } = this.state;
    if (!agentId.trim()) {
      this.setState({ inputError: "Agent ID cannot be empty.", error: null });
      return;
    }

    this.setState({ loading: true, error: null });

    const fetchAgentById = () =>
      new Promise((resolve, reject) => {
        fetch(`http://localhost:8080/agents/${agentId}`, {
          method: "GET",
          headers: {
            "X-Custom-Header": "validHeaderValue",
          },
        })
          .then((response) => {
            if (!response.ok) {
              if (response.status === 404) {
                reject(new Error(`Agent with ID "${agentId}" not found.`));
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
          .catch((error) =>
            reject(new Error(error.message || "Fetch failed."))
          );
      });

    fetchAgentById()
      .then((agentData) => {
        const formattedDate = new Date(agentData.dateOfJoining)
          .toISOString()
          .split("T")[0];

        this.setState({
          agentId: agentData.agentId,
          firstName: agentData.firstName,
          lastName: agentData.lastName,
          contact: agentData.contact,
          licenseNumber: agentData.licenseNumber,
          dateOfJoining: formattedDate,
          street: agentData.street,
          email: agentData.email,
          cityId: agentData.cityId,
          stateId: agentData.stateId,
          status: agentData.status,
          selectedProviders: agentData.providerIds,
          providerIds: agentData.providerIds || [],
          loading: false,
          formVisible: true,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          loading: false,
        });
      });
  };

  // handleChange = (e) => {
  //   const { name, value } = e.target;
  //   this.setState((prevState) => {
  //     if (name === "providerIds") {
  //       return {
  //         [name]: value
  //           .split(",")
  //           .map((id) => id.trim())
  //           .filter((id) => id !== ""),
  //       };
  //     }
  //     return {
  //       [name]: value,
  //     };
  //   });
  // };

  updateAgent = () => {
    const {
      agentId,
      firstName,
      lastName,
      contact,
      licenseNumber,
      dateOfJoining,
      street,
      email,
      cityId,
      stateId,
      status,
      selectedProviders,
      providerIds,
    } = this.state;

    const missingFields = [];
    if (!agentId) missingFields.push("Agent ID");
    if (!firstName) missingFields.push("Agent First Name");
    if (!lastName) missingFields.push("Agent Last Name");
    if (!licenseNumber) missingFields.push("License Number");
    if (!dateOfJoining) missingFields.push("Date of joining");
    if (!contact) missingFields.push("Contact Number");
    if (!email) missingFields.push("Email");
    if (!status) missingFields.push("Agent status");
    if (!street) missingFields.push("Street");
    if (!cityId) missingFields.push("City");
    if (!stateId) missingFields.push("State");
    if (!providerIds) missingFields.push("Provider Ids");

    if (missingFields.length > 0) {
      alert(`Please enter the following fields: ${missingFields.join(", ")}`);
      return;
    }
    if (
      this.state.agentNameError ||
      this.state.contactNumberError ||
      this.state.emailError ||
      this.state.AgentStatusError ||
      this.state.streetError ||
      this.state.cityIdError ||
      this.state.stateIdError ||
      this.state.licenseNumberError ||
      this.state.dateOfJoiningError ||
      this.state.streetError
    ) {
      alert("Please fix the validation errors before submitting.");
      return;
    }

    const updatedAgent = {
      agentId,
      firstName,
      lastName,
      contact,
      licenseNumber,
      dateOfJoining,
      street,
      email,
      cityId,
      stateId,
      status,
      providerIds: selectedProviders || [],
    };

    this.setState({ loading: true, updateSuccess: "", error: null });

    fetch(`http://localhost:8080/agents/update/${agentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAgent),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Update failed");
          });
        }
      })
      .then((data) => {
        this.setState({
          agentId: "",
          firstName: "",
          lastName: "",
          contact: "",
          licenseNumber: "",
          dateOfJoining: "",
          street: "",
          email: "",
          cityId: "",
          stateId: "",
          status: "",
          providerIds: "",
          loading: false,
          updateSuccess: "Agent updated successfully!",
          successVisible: true,
          formVisible: false,
        });
        setTimeout(() => {
          this.setState({ successVisible: false });
        }, 3000);
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message || "Update failed.",
        });
      });
  };

  render() {
    const { providers, cityId } = this.state;
    const {
      agentId,
      firstName,
      lastName,
      contact,
      licenseNumber,
      dateOfJoining,
      street,
      email,
      stateId,
      selectedProviders,
      status,
      loading,
      error,
      inputError,
      formVisible,
      updateSuccess,
      successVisible,
    } = this.state;

    return (
      <div className="container mt-5">
        <h2 className="text-center">Update Agent Details</h2>
        <div className="card shadow-sm p-4 mt-4">
          <div className="form-group mb-3">
            <label htmlFor="agentId" className="form-label">
              Enter Agent ID:
            </label>
            <div className="input-group">
              <input
                type="text"
                id="agentId"
                name="agentId"
                className="form-control"
                value={agentId}
                onChange={this.validateAgentId}
                placeholder="Enter Agent ID (e.g., A001)"
              />
              <button
                className="btn btn-primary"
                onClick={this.FetchAgentById}
                disabled={loading}
              >
                {loading ? "Fetching..." : "Fetch Agent"}
              </button>
            </div>
            {this.state.agentIdError && (
              <div className="text-danger">{this.state.agentIdError}</div>
            )}
            {inputError && <div className="text-danger">{inputError}</div>}
          </div>

          {loading && <div>Loading agent...</div>}

          {error && <div className="text-danger">Error: {error}</div>}

          {formVisible && (
            <div className="d-flex flex-column">
              <div
                className="row flex-grow-1"
                style={{
                  maxHeight: "450px",
                  overflowY: "auto",
                }}
              >
                {/* Left Column */}
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name:
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      value={firstName}
                      onChange={this.validateAgentFirstName}
                      required
                    />
                    {this.state.firstNameError && (
                      <div className="text-danger">
                        {this.state.firstNameError}
                      </div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="contact" className="form-label">
                      Contact Number:
                    </label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      className="form-control"
                      value={contact}
                      onChange={this.validateContactNumber}
                    />
                    {this.state.contactNumberError && (
                      <div className="text-danger">
                        {this.state.contactNumberError}
                      </div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="licenseNumber" className="form-label">
                      License Number:
                    </label>
                    <input
                      type="text"
                      id="licenseNumber"
                      name="licenseNumber"
                      className="form-control"
                      value={licenseNumber}
                      onChange={this.validateLicenseNumber}
                    />
                    {this.state.licenseNumberError && (
                      <div className="text-danger">
                        {this.state.licenseNumberError}
                      </div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="street" className="form-label">
                      Street:
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      className="form-control"
                      value={street}
                      onChange={this.validateStreet}
                    />
                    {this.state.streetError && (
                      <div className="text-danger">
                        {this.state.streetError}
                      </div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="dateOfJoining" className="form-label">
                      Date of Joining:
                    </label>
                    <input
                      type="date"
                      id="dateOfJoining"
                      name="dateOfJoining"
                      className="form-control"
                      value={dateOfJoining}
                      onChange={this.validateDateOfJoining}
                    />
                    {this.state.dateOfJoiningError && (
                      <div className="text-danger">
                        {this.state.dateOfJoiningError}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      value={lastName}
                      onChange={this.validateAgentLastName}
                    />
                    {this.state.lastNameError && (
                      <div className="text-danger">
                        {this.state.lastNameError}
                      </div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={email}
                      onChange={this.validateEmail}
                    />
                    {this.state.emailError && (
                      <div className="text-danger">{this.state.emailError}</div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="stateId">State:</label>
                    <select
                      className={`form-control ${
                        this.state.stateIdError ? "is-invalid" : ""
                      }`}
                      id="stateId"
                      value={stateId}
                      onChange={this.handleStateChange}
                    >
                      <option value="">Select State</option>
                      <option value="1">Tamil Nadu</option>
                      <option value="2">West Bengal</option>
                      <option value="3">Karnataka</option>
                      <option value="4">Maharashtra</option>
                    </select>
                    {this.state.stateIdError && (
                      <div className="invalid-feedback">
                        {this.state.stateIdError}
                      </div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="cityId">City:</label>
                    <select
                      className={`form-control ${
                        this.state.cityIdError ? "is-invalid" : ""
                      }`}
                      id="cityId"
                      value={cityId}
                      onChange={(e) => this.validateCityId(e)}
                    >
                      <option value="">Select City</option>
                      {this.state.cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {this.state.cityIdError && (
                      <div className="invalid-feedback">
                        {this.state.cityIdError}
                      </div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Agent Status:</label>
                    <select
                      name="status"
                      value={status}
                      onChange={this.validateAgentStatus}
                      className="form-control"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="2">In Active</option>
                    </select>
                    {this.state.agentStatusError && (
                      <div className="text-danger">
                        {this.state.stateIdError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="container mt-4">
                  <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                      <h3 className="card-title">Select Providers</h3>
                    </div>
                    <div className="card-body">
                      {providers.length > 0 ? (
                        <div className="row">
                          {providers.map((provider) => (
                            <div
                              className="col-md-6 mb-3"
                              key={provider.providerId}
                            >
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`provider-${provider.providerId}`}
                                  value={provider.providerId}
                                  checked={this.state.selectedProviders.includes(
                                    provider.providerId
                                  )}
                                  onChange={() =>
                                    this.handleCheckboxChange(
                                      provider.providerId
                                    )
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`provider-${provider.providerId}`}
                                >
                                  {provider.providerName}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted">Loading providers...</p>
                      )}
                      <div className="mt-3">
                        <h4>Selected Providers:</h4>
                        <p className="text-info">
                          {selectedProviders.join(", ") || "None selected"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-success mt-4"
                  onClick={this.updateAgent}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Agent"}
                </button>
              </div>
            </div>
          )}

          {successVisible && (
            <div className="alert alert-success mt-4">{updateSuccess}</div>
          )}
        </div>
      </div>
    );
  }
}
