import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class AgentUpdate extends Component {
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
      loading: false,
      error: null,
      inputError: "",
      formVisible: false,
      updateSuccess: "",
    };
  }

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
          .catch((error) => reject(new Error(error.message || "Fetch failed.")));
      });

    fetchAgentById()
      .then((agentData) => {
        this.setState({
          agentId: agentData.agentId,
          firstName: agentData.firstName,
          lastName: agentData.lastName,
          contact: agentData.contact,
          licenseNumber: agentData.licenseNumber,
          dateOfJoining: agentData.dateOfJoining,
          street: agentData.street,
          email: agentData.email,
          cityId: agentData.cityId,
          stateId: agentData.stateId,
          status: agentData.status,
          providerIds: agentData.providerIds.join(','),
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

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

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
      providerIds,
    } = this.state;

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
      providerIds,
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
          providerIds: [],
          loading: false,
          updateSuccess: "Agent updated successfully!",
          formVisible: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message || "Update failed.",
        });
      });
  };

  render() {
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
      providerIds,
      loading,
      error,
      inputError,
      formVisible,
      updateSuccess,
    } = this.state;

    return (
      <div>
        <h1>Update Agent Details</h1>
        <div className="mb-3">
          <label htmlFor="agentId" className="form-label">Enter Agent ID:</label>
          <input
            type="text"
            id="agentId"
            name="agentId"
            className="form-control"
            value={agentId}
            onChange={this.handleChange}
            placeholder="A001"
          />
          {inputError && <div className="text-danger">{inputError}</div>}
          <button className="btn btn-primary mt-2" onClick={this.FetchAgentById}>
            Fetch Agent
          </button>
        </div>

        {loading && <div>Loading agent...</div>}

        {error && <div className="text-danger">Error: {error}</div>}

        {formVisible && (
          <div
            className="mb-3"
            style={{
              maxHeight: '400px',
              overflowY: 'auto',
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '5px',
            }}
          >
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                value={firstName}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                value={lastName}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contact" className="form-label">Contact Number:</label>
              <input
                type="text"
                id="contact"
                name="contact"
                className="form-control"
                value={contact}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="licenseNumber" className="form-label">License Number:</label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                className="form-control"
                value={licenseNumber}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dateOfJoining" className="form-label">Date of Joining:</label>
              <input
                type="date"
                id="dateOfJoining"
                name="dateOfJoining"
                className="form-control"
                value={dateOfJoining}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="street" className="form-label">Street:</label>
              <input
                type="text"
                id="street"
                name="street"
                className="form-control"
                value={street}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={email}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cityId" className="form-label">City ID:</label>
              <input
                type="text"
                id="cityId"
                name="cityId"
                className="form-control"
                value={cityId}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="stateId" className="form-label">State ID:</label>
              <input
                type="text"
                id="stateId"
                name="stateId"
                className="form-control"
                value={stateId}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status:</label>
              <input
                type="text"
                id="status"
                name="status"
                className="form-control"
                value={status}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="providerIds" className="form-label">Provider IDs:</label>
              <input
                type="text"
                id="providerIds"
                name="agentIds"
                className="form-control"
                value={providerIds}
                onChange={this.handleChange}
              />
            </div>

            <button className="btn btn-success" onClick={this.updateAgent}>
              Update Agent
            </button>
          </div>
        )}

        {updateSuccess && <div className="text-success">{updateSuccess}</div>}
      </div>
    );
  }
}
