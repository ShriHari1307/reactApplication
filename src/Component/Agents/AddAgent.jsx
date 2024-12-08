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
      showSuccessCard: false,
      showErrorCard: false,
      agentIdError: "",
      agentNameError: "",
      contactNumberError: "",
      emailError: "",
      streetError: "",
      cityIdError: "",
      stateIdError: "",
      licenseNumberError: "",
      dateOfJoiningError: "",
      validationCard: false,
      validationError: "",
      AgentStatusError: "",
    };
  }

  // For city mapping
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
    const fetchProviders = new Promise((resolve, reject) => {
      fetch("http://localhost:8080/provider")
        .then((response) => {
          if (!response.ok) {
            reject(new Error("Failed to fetch Providers"));
          }
          return response.json();
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  
    fetchProviders
      .then((data) => {
        this.setState({
          providers: data.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message || "An unexpected error occurred",
          loading: false,
        });
      });
  }
  

  //include the provider when selected
  handleCheckboxChange = (providerId) => {
    const { selectedProviders } = this.state;
    const isSelected = selectedProviders.includes(providerId);

    this.setState({
      selectedProviders: isSelected
        ? selectedProviders.filter((id) => id !== providerId)
        : [...selectedProviders, providerId],
    });
  };

  //for change state 
  handleStateChange = (e) => {
    const stateId = e.target.value;
    this.setState({
      stateId,
      cityId: "",
      cities: this.cityMapping[stateId] || [],
    });
  };

  //agent name validation
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

  //agent name validation
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

  validateAgentId = (e) => {
    const value = e.target.value;
    const regex = /^[Aa][0-9]{3,6}$/;
    this.setState({
      agentId: value,
      agentIdError:
        value && !regex.test(value)
          ? "Agent id should be of the format [Axxx]  where x is a digit"
          : "",
    });
  };

  // street validation
  validateStreet = (e) => {
    const value = e.target.value;
    this.setState({
      street: value,
      streetError: !value ? "Street cannot be empty" : "",
    });
  };

  //city validation
  validateCityId = (e) => {
    const value = e.target.value;
    this.setState({
      cityId: value,
      cityIdError: !value ? "City must be selected" : "",
    });
  };

  //agent status validation
  validateAgentStatus = (e) => {
    const value = e.target.value;
    this.setState({
      status: value,
      AgentStatusError: !value ? "AgentStatus must be selected" : "",
    });
  };

  //state validation
  validateStateId = (e) => {
    const value = e.target.value;
    this.setState({
      stateId: value,
      stateIdError: !value ? "State must be selected" : "",
    });
  };

  //contact validation
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

  //license number validation
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


  //email validation
  validateEmail = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    this.setState({
      email: value,
      emailError: value && !regex.test(value) ? "Email is not valid" : "",
    });
  };

  //DOJ validation
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

  // on submit
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
      selectedProviders,
    } = this.state;
  
    // Check for validation errors
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
      this.setState({
        validationCard: true,
        validationError: "Please fix all the validation errors before submitting.",
      });
      setTimeout(() => {
        this.setState({ validationCard: false });
      }, 3000);
  
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
    const addAgent = new Promise((resolve, reject) => {
      fetch("http://localhost:8080/agents/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              reject(new Error(errorData.response || "Failed to add provider"));
            });
          }
          return response.json();
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
    addAgent
      .then((data) => {
        console.log("Response data:", data);
        this.setState({
          showSuccessCard: true,
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
        setTimeout(() => {
          this.setState({ showSuccessCard: false });
        }, 3000);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        this.setState({
          showErrorCard: true,
          errorMessage: error.message || "An unexpected error occurred",
        });
        setTimeout(() => {
          this.setState({ showErrorCard: false });
        }, 3000);
      });
  };
  
  render() {
    const { providers, selectedProviders } = this.state;
    return (
      <div className="containter mt-5">
        {this.state.validationCard && (
          <div
            style={{
              position: "fixed",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#dc3545",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "1rem",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              textAlign: "center",
            }}
          >
            <span>{this.state.validationError}</span>
          </div>
        )}

        {this.state.showErrorCard && (
          <div
            style={{
              position: "fixed",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#dc3545",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "1rem",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              textAlign: "center",
            }}
          >
            <span>{this.state.errorMessage}</span>
          </div>
        )}

        {this.state.showSuccessCard && (
          <div
            style={{
              position: "fixed",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "1rem",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              textAlign: "center",
            }}
          >
            <span>Agent added successfully!</span>
          </div>
        )}
        <h2 className="text-center mb-4">Add Agent</h2>
        <div
          className="scrollable-form"
          style={{ maxHeight: "550px", overflowY: "auto" }}
        >
          <form
            onSubmit={this.handleSubmit}
            className="p-4 bg-light shadow-sm rounded"
          >
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
                              checked={selectedProviders.includes(
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
