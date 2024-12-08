import React, { Component } from "react";

export default class AddProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerId: "",
      providerName: "",
      contactNumber: "",
      email: "",
      providerType: "",
      street: "",
      cityId: "",
      stateId: "",
      agentIds: [],
      cities: [],
      agents: [],
      providerIdError: "",
      providerNameError: "",
      contactNumberError: "",
      emailError: "",
      providerTypeError: "",
      streetError: "",
      cityIdError: "",
      stateIdError: "",
      agentIdsError: "",
      error: null,
      loading: true,
      showSuccessCard: false,
      validationCard: false,
      validationError: "",
    };
  }

  //city mapping
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
    new Promise((resolve, reject) => {
      fetch("http://localhost:8080/agents")
        .then((response) => {
          if (!response.ok) {
            reject(new Error("Failed to fetch agents"));
          }
          return response.json();  
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    })
      .then((data) => {
        this.setState({
          agents: data.data, 
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message || "Failed to fetch agents",
          loading: false,
        });
      });
  }
  

  // for state change
  handleStateChange = (e) => {
    const stateId = e.target.value;
    this.setState({
      stateId,
      cityId: "",
      cities: this.cityMapping[stateId] || [],
    });
  };

  //contact number validation
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
      contactNumber: value,
      contactNumberError: errorMessage,
    });
  };

  // emaIL validation
  validateEmail = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    this.setState({
      email: value,
      emailError: value && !regex.test(value) ? "Email is not valid" : "",
    });
  };

  //provider type validation
  validateProviderType = (e) => {
    const value = e.target.value;
    this.setState({
      providerType: value,
      providerTypeError: !value ? "Provider Type must be selected" : "",
    });
  };

  //street validation
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

  //state validation
  validateStateId = (e) => {
    const value = e.target.value;
    this.setState({
      stateId: value,
      stateIdError: !value ? "State must be selected" : "",
    });
  };

  //validate agent ids
  validateAgentIds = (e) => {
    const value = e.target.value;
    const agentIdsArray = value.split(",").map((id) => id.trim());
    this.setState({
      agentIds: agentIdsArray,
      agentIdsError:
        !value || agentIdsArray.length === 0 ? "Agent IDs cannot be empty" : "",
    });
  };

  //validation of provider name
  validateProviderName = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z ]+$/;
    this.setState({
      providerName: value,
      providerNameError:
        value && !regex.test(value)
          ? "Provider name cannot contain numbers or special characters"
          : "",
    });
  };

  //provider id validation
  validateProviderId = (e) => {
    const value = e.target.value;
    const regex = /^[Pp][0-9]{3,6}$/;
    this.setState({
      providerId: value,
      providerIdError:
        value && !regex.test(value)
          ? "Provider id should be of the format [Pxxx] where x is a digit"
          : "",
    });
  };

  //on submit
  handleSubmit = (event) => {
    event.preventDefault();
  
    const {
      providerId,
      providerName,
      contactNumber,
      email,
      providerType,
      street,
      cityId,
      stateId,
      providerNameError,
      contactNumberError,
      emailError,
      providerTypeError,
      streetError,
      cityIdError,
      stateIdError,
      agentIdsError,
    } = this.state;
  
    if (
      providerNameError ||
      contactNumberError ||
      emailError ||
      providerTypeError ||
      streetError ||
      cityIdError ||
      stateIdError ||
      agentIdsError
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
  
    // Make up the data
    const payload = {
      providerId,
      providerName,
      contactNumber,
      email,
      providerType,
      street,
      cityId,
      stateId,
    };
  
    console.log("Payload data:", payload);
    const createProvider = new Promise((resolve, reject) => {
      fetch("http://localhost:8080/provider/create", {
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
  
    createProvider
      .then((data) => {
        console.log("Response data", data);
        this.setState({
          showSuccessCard: true,
          successMessage: "Provider added successfully!",
          providerId: "",
          providerName: "",
          contactNumber: "",
          email: "",
          providerType: "",
          street: "",
          cityId: "",
          stateId: "",
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
    return (
      <div className="container mt-5">
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
            <span>Provider added successfully!</span>
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
        <h2 className="text-center mb-4">Add Provider</h2>
        <div
          className="scrollable-form"
          style={{ maxHeight: "600px", overflowY: "auto" }}
        >
          <form
            onSubmit={this.handleSubmit}
            className="p-4 bg-light shadow-sm rounded"
          >
            {/* Form fields and validation errors */}

            <div className="mb-3">
              <label className="form-label">Provider Name:</label>
              <input
                type="text"
                name="providerName"
                value={this.state.providerName}
                onChange={this.validateProviderName}
                className="form-control"
                placeholder="Enter provider name"
                required
              />
              {this.state.providerNameError && (
                <div className="text-danger">
                  {this.state.providerNameError}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Contact Number:</label>
              <input
                type="text"
                name="contactNumber"
                value={this.state.contactNumber}
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

            <div className="mb-3">
              <label className="form-label">Provider Type:</label>
              <select
                name="providerType"
                value={this.state.providerType}
                onChange={this.validateProviderType}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="Life Insurance">Life Insurance</option>
                <option value="Health Insurance">Health Insurance</option>
                <option value="Vechicle Insurance">Vechicle Insurance</option>
              </select>
              {this.state.providerTypeError && (
                <div className="text-danger">
                  {this.state.providerTypeError}
                </div>
              )}
            </div>

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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
