import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default class UpdateProvByName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerName: "",
      providerId: "",
      contactNumber: "",
      email: "",
      street: "",
      status: "",
      errorStatus: false,
      matchingProviders: [],
      selectedProvider: null,
      editableDetails: null,
      successVisible: false,
      showForm: true,
      updateSuccess: "",
      stateId: "",
      cityId: "",
      cities: [],
      providerNameError: "",
      contactNumberError: "",
      providerIds: [],
      providers: [],
      availableProviders: [],
      selectedProviders: [],
      validationCard: false,
      errorCardVisible: false,
      errorMessage: "",
      validationError: "",
      emailError: "",
      streetError: "",
      cityIdError: "",
      stateIdError: "",
      providerNotFoundVisible: false,
      enterProviderNameVisible: false,
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


  validateDateOfJoining = (e) => {
    const dateOfJoining = e?.target?.value;
    if (!dateOfJoining) return;

    const currentDate = new Date().toISOString().split("T")[0];

    if (dateOfJoining > currentDate) {
      this.setState({
        dateOfJoining,
        dateOfJoiningError: "Date of Joining cannot be in the future.",
        errorStatus: true,
      });
    } else {
      this.setState(
        {
          dateOfJoining,
          dateOfJoiningError: "",
        },
        () => {
          if (this.state.selectedProvider) {
            this.setState((prevState) => ({
              editableDetails: {
                ...prevState.editableDetails,
                dateOfJoining,
              },
            }));
          }
        }
      );
    }
  };

  validateLicenseNumber = (e) => {
    const value = e?.target?.value;
    if (!value) return;

    const regex = /^LIC\d{3,10}$/;
    this.setState(
      {
        licenseNumber: value,
        licenseNumberError:
          value && !regex.test(value)
            ? "License number must be of the format e.g (LIC234)"
            : "",
        errorStatus: true,
      },
      () => {
        if (this.state.selectedProvider) {
          this.setState((prevState) => ({
            editableDetails: {
              ...prevState.editableDetails,
              licenseNumber: value,
            },
          }));
        }
      }
    );
  };

  handleCheckboxChange = (providerId) => {
    const { selectedProviders, editableDetails } = this.state;
    const isSelected = selectedProviders.includes(providerId);
    const updatedSelectedProviders = isSelected
      ? selectedProviders.filter((id) => id !== providerId)
      : [...selectedProviders, providerId];

    this.setState({
      selectedProviders: updatedSelectedProviders,
      editableDetails: {
        ...editableDetails,
        selectedProviders: updatedSelectedProviders,
        providerIds: updatedSelectedProviders,
      },
    });
  };

  validateProviderName = (e) => {
    const value = e?.target?.value;
    if (!value) return;

    const regex = /^[A-Za-z ]+$/;
    this.setState(
      {
        providerName: value,
        providerNameError:
          value && !regex.test(value)
            ? "Provider name cannot contain numbers or special characters"
            : "",
        errorStatus: true,
      },
      () => {
        if (this.state.selectedProvider) {
          this.setState((prevState) => ({
            editableDetails: {
              ...prevState.editableDetails,
              providerName: value,
            },
          }));
        }
      }
    );
  };


  validateContactNumber = (e) => {
    const value = e?.target?.value;
    if (!value) return;

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

    this.setState(
      {
        contactNumber: value,
        contactNumberError: errorMessage,
        errorStatus: true,
      },
      () => {
        if (this.state.selectedProvider) {
          this.setState((prevState) => ({
            editableDetails: {
              ...prevState.editableDetails,
              contactNumber: value,
            },
          }));
        }
      }
    );
  };

  validateProviderType = (e) => {
    const value = e.target.value;
    this.setState(
      (prevState) => ({
        providerTypeError: !value ? "Provider Type must be selected" : "",
        editableDetails: {
          ...prevState.editableDetails,
          providerType: value,  
        },
      })
    );
  };
  
  validateEmail = (e) => {
    const value = e?.target?.value;
    if (!value) return;

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    this.setState(
      {
        email: value,
        emailError: value && !regex.test(value) ? "Email is not valid" : "",
        errorStatus: true,
      },
      () => {
        if (this.state.selectedProvider) {
          this.setState((prevState) => ({
            editableDetails: {
              ...prevState.editableDetails,
              email: value,
            },
          }));
        }
      }
    );
  };

  validateStreet = (e) => {
    const value = e.target.value;
    this.setState(
      {
        street: value,
        streetError: !value ? "Street cannot be empty" : "",
        errorStatus: true,
      },
      () => {
        if (this.state.selectedProvider) {
          this.setState((prevState) => ({
            editableDetails: {
              ...prevState.editableDetails,
              street: value,
            },
          }));
        }
      }
    );
  };

  validateCityId = (e) => {
    const value = e.target.value;
    this.setState(
      {
        cityId: value,
        cityIdError: !value ? "City must be selected" : "",
        errorStatus: true,
      },
      () => {
        if (this.state.selectedProvider) {
          this.setState((prevState) => ({
            editableDetails: {
              ...prevState.editableDetails,
              cityId: value,
            },
          }));
        }
      }
    );
  };


  validateStateId = (e) => {
    const value = e.target.value;
    this.setState(
      {
        stateId: value,
        stateIdError: !value ? "State must be selected" : "",
        errorStatus: true,
      },
      () => {
        if (this.state.selectedProvider) {
          this.setState((prevState) => ({
            editableDetails: {
              ...prevState.editableDetails,
              stateId: value,
            },
          }));
        }
      }
    );
  };


  handleStateChange = (e) => {
    const stateId = e.target.value;
    this.setState(
      {
        stateId,
        cityId: "",
        cities: this.cityMapping[stateId] || [],
        stateIdError: stateId ? "" : "Please select a state",
        cityIdError: "",
        errorStatus: true,
      },
      () => {
        if (this.state.selectedProvider) {
          this.setState((prevState) => ({
            editableDetails: {
              ...prevState.editableDetails,
              stateId: stateId,
              cityId: "",
            },
          }));
        }
      }
    );
  };

  handleCityChange = (e) => {
    const cityId = e.target.value;
    this.setState(
      {
        cityId: cityId,
        cityIdError: cityId ? "" : "Please select a city",
        errorStatus: true,
      },
      () => {
        if (this.state.selectedProvider) {
          this.setState((prevState) => ({
            editableDetails: {
              ...prevState.editableDetails,
              cityId: cityId,
            },
          }));
        }
      }
    );
  };

  

  validateAgentStatus = (e) => {
    const value = e.target.value;
    this.setState(
      {
        status: value,
        AgentStatusError: !value ? "AgentStatus must be selected" : "",
        errorStatus: true,
      },
      () => {
        this.setState((prevState) => ({
          editableDetails: {
            ...prevState.editableDetails,
            status: prevState.status,
          },
        }));
      }
    );
  };

  handleInputChange = (e) => {
    this.setState({ providerName: e.target.value });
  };
  validateInput = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z ]+$/;
    this.setState({
      providerName: value,
      inputError:
        value && !regex.test(value)
          ? "Input cannot contain numbers or special characters"
          : "",
    });
  };

  fetchProvidersByName = async () => {
    const { providerName,inputError } = this.state;

    if (inputError) {
      this.setState({
        enterProviderNameVisible: false, // Hide "Please enter provider name"
        providerNotFoundVisible: false,
        matchingProviders: [],
        validationError: "Please fix the error before searching", // Show providerNameError message
      },
      () => {
        setTimeout(() => {
          this.setState({ validationError: "" });
        }, 2000);
      });
      return;
    }

    this.setState({
      matchingProviders: [],
    });

    if (!providerName.trim()) {
      this.setState({
        providerNotFoundVisible: false,
        enterProviderNameVisible: true,
      });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/provider/search`, {
        params: { name: providerName },
      });

      if (response.data.length === 0) {
        this.setState({
          providerNotFoundVisible: true,
          enterProviderNameVisible: false,
        });
        return;
      }

      this.setState({
        matchingProviders: response.data,
        selectedProvider: null,
        providerNotFoundVisible: false,
        enterProviderNameVisible: false,
      });
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  selectProviderForUpdate = (provider) => {
    this.setState({
      selectedProvider: provider,
      selectedProviders: provider.providerIds,
      editableDetails: { ...provider },
      stateId: provider.stateId,
      cityId: provider.cityId,
      cities: this.cityMapping[provider.stateId] || [],
    });
  };

  handleEditChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      editableDetails: { ...prevState.editableDetails, [name]: value },
    }));
  };

  handleValidationAndUpdate = async () => {
    const { editableDetails } = this.state;
    let errorStatus = false;
    this.validateProviderName({
      target: { value: editableDetails.firstName },
    });
    this.validateContactNumber({
      target: { value: editableDetails.contactNumber },
    });
    this.validateEmail({
      target: { value: editableDetails.email },
    });
    this.validateStreet({
      target: { value: editableDetails.street },
    });
    this.validateCityId({
      target: { value: editableDetails.cityId },
    });
    this.validateStateId({
      target: { value: editableDetails.stateId },
    });

    const {
      providerNameError,
      contactNumberError,
      emailError,
      streetError,
      cityIdError,
      stateIdError,
    } = this.state;

    if (
      providerNameError ||
      contactNumberError ||
      emailError ||
      streetError ||
      cityIdError ||
      stateIdError
    ) {
      errorStatus = true;
    }

    if (errorStatus) {
      this.setState({
        validationCard: true,
        validationError:
          "Please fix all the validation errors before submitting.",
        errorStatus: true,
      });
      setTimeout(() => {
        this.setState({ validationCard: false });
      }, 3000);

      return;
    }

    this.setState({ errorStatus: false }, async () => {
      await this.updateProviderDetails(editableDetails);
    });
  };
  updateProviderDetails = async (editableDetails) => {
    try {
      console.log("Request Payload:", editableDetails);
      await axios.put(
        `http://localhost:8080/provider/update/${editableDetails.providerId}`,
        editableDetails
      );

      this.setState({
        successVisible: true,
        updateSuccess: "Provider updated successfully!",
        showForm: false,
      });

      setTimeout(() => {
        this.setState({
          firstName: "",
          matchingProviders: [],
          selectedProvider: null,
          editableDetails: null,
          successVisible: false,
          updateSuccess: "",
          stateId: "",
          cityId: "",
          cities: [],
          stateIdError: "",
          cityIdError: "",
          validationCard: false,
          validationError: "",
          showForm: true,
        });
      }, 3000);
    } catch (error) {
      console.error("Error updating Provider:", error);

      // Show error message in case of an update failure
      this.setState({
        errorCardVisible: true,
        errorMessage: "An error occurred while updating provider details.",
        showForm: false, 
      });

      // Reset state after 3 seconds
      setTimeout(() => {
        this.setState({
          errorCardVisible: false,
          errorMessage: "",
          firstName: "",
          matchingProviders: [],
          selectedProvider: null,
          editableDetails: null,
          stateId: "",
          cityId: "",
          cities: [],
          validationCard: false,
          validationError: "",
          showForm: true,
        });
      }, 3000);
    }
  };

  render() {
    const {
      firstName,
      matchingProviders,
      selectedProvider,
      editableDetails,
      successVisible,
      updateSuccess,
      cities,
      cityId,
      stateIdError,
      cityIdError,
      providerNotFoundVisible,
      enterProviderNameVisible,
      validationError,
    } = this.state;

    return (
      <div
        className="container mt-5"
        style={{ maxHeight: "700px", overflowY: "auto" }}
      >
        <h2 className="text-center mb-4">Provider Management</h2>

        {/* Search Section */}
        <div className="card shadow p-4 mb-4">
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
          <div className="form-group">
            <label htmlFor="providerName" className="form-label">
              Enter Provider Name:
            </label>
            {validationError && (  // Display validation error card if exists
                  <div className="alert alert-danger">
                    <strong>{validationError}</strong>
                  </div>
                )}
            <input
              type="text"
              className="form-control"
              id="providerName"
              value={firstName}
              onChange={this.validateInput}
              placeholder="Enter provider name"
            />
            {this.state.inputError && (
              <div className="text-danger">{this.state.inputError}</div>
            )}
            <button
              className="btn btn-primary mt-3"
              onClick={this.fetchProvidersByName}
            >
              Search
            </button>
          </div>
        </div>

        {/* Matching Providers Section */}
        {matchingProviders.length > 0 && (
          <div className="card shadow p-4 mb-4">
            <h3 className="text-center mb-4">Matching Providers</h3>
            <ul className="list-group">
              {matchingProviders.map((provider) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={provider.providerId}
                >
                  {provider.providerName}
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => this.selectProviderForUpdate(provider)}
                  >
                    Update
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

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

        {this.state.errorCardVisible && (
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

        {/* Success Message */}
        {successVisible && (
          <div className="alert alert-success mt-3">{updateSuccess}</div>
        )}
        {enterProviderNameVisible && (
          <div className="alert alert-warning mt-3">
            Please enter a Provider name.
          </div>
        )}

        {providerNotFoundVisible && (
          <div className="alert alert-danger mt-3">
            No Provider found with the given name.
          </div>
        )}

        {/* Edit Provider Details Section */}
        {this.state.showForm && selectedProvider && (
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Edit Provider Details</h3>
            <div className="form-group mb-3">
              <label htmlFor="editName">Provider Name:</label>
              <input
                type="text"
                className="form-control"
                id="editName"
                name="providerName"
                value={editableDetails.providerName}
                onChange={this.validateProviderName}
              />
              {this.state.providerNameError && (
                <div className="text-danger">
                  {this.state.providerNameError}
                </div>
              )}
            </div>

        
            <div className="form-group mb-3">
              <label htmlFor="editContact">Contact Number:</label>
              <input
                type="text"
                className="form-control"
                id="editContact"
                name="contactNumber"
                value={editableDetails.contactNumber}
                onChange={this.validateContactNumber}
              />
              {this.state.contactNumberError && (
                <div className="text-danger">
                  {this.state.contactNumberError}
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                id="street"
                name="street"
                className="form-control"
                value={editableDetails.street}
                onChange={this.validateStreet}
                placeholder="Enter Street"
                required
              />
              {this.state.streetError && (
                <div className="text-danger">{this.state.stateIdError}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="editContact">Email:</label>
              <input
                type="text"
                className="form-control"
                id="editContact"
                name="email"
                value={editableDetails.email}
                onChange={this.validateEmail}
              />
              {this.state.emailError && (
                <div className="text-danger">
                  {this.state.emailError}
                </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Provider Type:</label>
              <select
                name="providerType"
                value={editableDetails.providerType}
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

            {/* State Dropdown */}
            <div className="form-group mb-3">
              <label htmlFor="stateId">State:</label>
              <select
                id="stateId"
                className="form-control"
                value={editableDetails.stateId}
                onChange={this.handleStateChange}
              >
                <option value="">Select State</option>
                <option value="1">Tamil Nadu</option>
                <option value="2">West Bengal</option>
                <option value="3">Karnataka</option>
                <option value="4">Maharashtra</option>
              </select>
              {stateIdError && (
                <div className="text-danger mt-2">{stateIdError}</div>
              )}
            </div>

            {/* City Dropdown */}
            <div className="form-group mb-3">
              <label htmlFor="cityId">City:</label>
              <select
                id="cityId"
                className="form-control"
                value={cityId}
                onChange={this.handleCityChange}
                disabled={cities.length === 0}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {cityIdError && (
                <div className="text-danger mt-2">{cityIdError}</div>
              )}
            </div>
            <button
              className="btn btn-primary"
              onClick={this.handleValidationAndUpdate}
            >
              Update Provider
            </button>
          </div>
        )}
      </div>
    );
  }
}
