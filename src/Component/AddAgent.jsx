import React, { Component } from "react";

export default class AddAgent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agentId: "",
      firstName: "",
      lastName: "",
      contact: "",
      licenseNumber: "",
      dateOfJoining: "",
      providerIds: [],
      providers: [],
      cities: [],
      cityId: "",
      stateId: "",
      street: "",
      email: "",
      selectedProviders: [],
      status: "",
      error: null,
      loading: true,
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
          ? "Agent id should be of the format [Axxx]"
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateContactNumber = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]{10}$/;
    this.setState({
      contact: value,
      contactNumberError:
        value && !regex.test(value) ? "Contact Number must be 10 digits" : "",
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

  handleSubmit = (event) => {
    event.preventDefault();
  
    const {
      agentId,
      firstName,
      lastName,
      contact,
      licenseNumber,
      dateOfJoining,
      cityId,
      stateId,
      street,
      email,
      status,
      agentIdError,
      agentNameError,
      contactNumberError,
      emailError,
      streetError,
      cityIdError,
      stateIdError,
      licenseNumberError,
      dateOfJoiningError,
      AgentStatusError,
      selectedProviders
    } = this.state;
  
    if (
      agentIdError ||
      agentNameError ||
      contactNumberError ||
      emailError ||
      streetError ||
      cityIdError ||
      stateIdError ||
      licenseNumberError ||
      dateOfJoiningError ||
      AgentStatusError
    ) {
      alert("Please fix the validation errors");
      return;
    }
  
    const payload = {
      agentId,
      firstName,
      lastName,
      contact,
      licenseNumber,
      dateOfJoining,
      providerIds: selectedProviders,
      cityId,
      stateId,
      street,
      email,
      status: status,
    };
  
    console.log("Payload to be sent:", payload);  
  
    fetch("http://localhost:8080/agents/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject("Failed to add agent. Please Try again");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);  
        alert("Agent added Successfully");
        this.setState({
          agentId: "",
          firstName: "",
          lastName: "",
          contact: "",
          licenseNumber: "",
          dateOfJoining: "",
          providerIds: "",
          cityId: "",
          stateId: "",
          street: "",
          email: "",
          status: "",
          selectedProviders: [],
        });
      })
      .catch((error) => {
        console.error("Error occurred:", error);  
        alert(`Error: ${error}`);
      });
  };
  
  render() {
    const { providers, selectedProviders } = this.state;
    return (
      <div className="containter mt-5">
        <h2 className="text-center mb-4">Add Agent</h2>
        <div
          className="scrollable-form"
          style={{ maxHeight: "550px", overflowY: "auto" }}
        >
          <form
            onSubmit={this.handleSubmit}
            className="p-4 bg-light shadow-sm rounded"
          >
            {/* agentid */}
            <div className="mb-3">
              <label className="form-label">Agent Id:</label>
              <input
                type="text"
                name="agentId"
                value={this.state.agentId}
                onChange={this.validateAgentId}
                className="form-control"
                placeholder="Enter the Agent Id (e.g A123)"
                required
              />
              {this.state.agentIdError && (
                <div className="text-danger">{this.state.agentIdError}</div>
              )}
            </div>

            {/* First Name */}
            <div className="mb-3">
              <label className="form-label">First Name:</label>
              <input
                type="text"
                name="firstname"
                value={this.state.firstName}
                onChange={this.validateAgentFirstName}
                className="form-control"
                placeholder="Enter the Agent First Name:"
                required
              />
              {this.state.firstNameError && (
                <div className="text-danger">{this.state.firstNameError}</div>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label className="form-label">Last Name:</label>
              <input
                type="text"
                name="lastname"
                value={this.state.lastName}
                onChange={this.validateAgentLastName}
                className="form-control"
                placeholder="Enter the Agent Last Name"
                required
              />
              {this.state.lastNameError && (
                <div className="text-danger">{this.state.lastNameError}</div>
              )}
            </div>

            {/* contactNumber */}
            <div className="mb-3">
              <label className="form-label">Contact Number:</label>
              <input
                type="text"
                name="contact"
                value={this.state.contact}
                onChange={this.validateContactNumber}
                className="form-control"
                placeholder="Enter contact number"
                required
              />
              {this.state.contactNumberError && (
                <div className="text-danger">
                  {this.state.contactNumberError}
                </div>
              )}
            </div>

            {/* License Number */}
            <div className="mb-3">
              <label className="form-label">License Number:</label>
              <input
                type="text"
                name="licenseNumber"
                value={this.state.licenseNumber}
                onChange={this.validateLicenseNumber}
                className="form-control"
                placeholder="Enter the Agent License Number"
                required
              />
              {this.state.licenseNumberError && (
                <div className="text-danger">
                  {this.state.licenseNumberError}
                </div>
              )}
            </div>

            {/* Date of joining */}
            <div className="mb-3">
              <label className="form-label">Date of Joining:</label>
              <input
                type="date"
                name="dateOfJoining"
                value={this.state.dateOfJoining}
                onChange={this.validateDateOfJoining}
                className="form-control"
                placeholder="Enter the Date of Joining"
                required
              />
              {this.state.dateOfJoiningError && (
                <div className="text-danger">
                  {this.state.dateOfJoiningError}
                </div>
              )}
            </div>

            {/* email */}
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.validateEmail}
                className="form-control"
                placeholder="Enter email"
                required
              />
              {this.state.emailError && (
                <div className="text-danger">{this.state.emailError}</div>
              )}
            </div>

            {/* street */}
            <div className="mb-3">
              <label className="form-label">Street:</label>
              <input
                type="text"
                name="street"
                value={this.state.street}
                onChange={this.validateStreet}
                className="form-control"
                placeholder="Enter street address"
                required
              />
              {this.state.streetError && (
                <div className="text-danger">{this.state.streetError}</div>
              )}
            </div>

            {/* state */}
            <div className="mb-3">
              <label className="form-label">State:</label>
              <select
                name="stateId"
                value={this.state.stateId}
                onChange={this.handleStateChange}
                className="form-control"
                required
              >
                <option value="">Select State</option>
                <option value="1">Tamil Nadu</option>
                <option value="2">West Bengal</option>
                <option value="3">Karnataka</option>
                <option value="4">Maharashtra</option>
              </select>
              {this.state.stateIdError && (
                <div className="text-danger">{this.state.stateIdError}</div>
              )}
            </div>

            {/* city */}
            <div className="mb-3">
              <label className="form-label">City:</label>
              <select
                name="cityId"
                value={this.state.cityId}
                onChange={this.validateCityId}
                className="form-control"
                required
              >
                <option value="">Select City</option>
                {this.state.cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {this.state.cityIdError && (
                <div className="text-danger">{this.state.cityIdError}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Agent Status:</label>
              <select
                name="status"
                value={this.state.status}
                onChange={this.validateAgentStatus}
                className="form-control"
                required
              >
                <option value="">Select Status</option>
                <option value="1">Active</option>
                <option value="2">In Active</option>
              </select>
              {this.state.agentStatusError && (
                <div className="text-danger">{this.state.stateIdError}</div>
              )}
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
                                this.handleCheckboxChange(provider.providerId)
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

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
