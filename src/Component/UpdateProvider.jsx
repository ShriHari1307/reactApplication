import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class ProviderUpdate extends Component {
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
      loading: false,
      error: null,
      inputError: "",
      formVisible: false,
      updateSuccess: "", 
    };
  }

  FetchProviderId = () => {
    const { providerId } = this.state;
    if (!providerId.trim()) {
      this.setState({ inputError: "Provider ID cannot be empty.", error: null });
      return;
    }

    this.setState({ loading: true, error: null });

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
          providerId: providerData.providerId,
          providerName: providerData.providerName,
          contactNumber: providerData.contactNumber,
          email: providerData.email,
          providerType: providerData.providerType,
          street: providerData.street,
          cityId: providerData.cityId,
          stateId: providerData.stateId,
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

  updateProvider = () => {
    const {
      providerId,
      providerName,
      contactNumber,
      email,
      providerType,
      street,
      cityId,
      stateId,
    } = this.state;

    const updatedProvider = {
      providerId,
      providerName,
      contactNumber,
      email,
      providerType,
      street,
      cityId,
      stateId,
    };

    this.setState({ loading: true, updateSuccess: "", error: null });

    fetch(`http://localhost:8080/provider/update/${providerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProvider),
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
          providerId: "",
          providerName: "",
          contactNumber: "",
          email: "",
          providerType: "",
          street: "",
          cityId: "",
          stateId: "",
          loading: false,
          updateSuccess: "Provider updated successfully!", 
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
      providerId,
      providerName,
      contactNumber,
      email,
      providerType,
      street,
      cityId,
      stateId,
      loading,
      error,
      inputError,
      formVisible,
      updateSuccess,
    } = this.state;

    return (
      <div>
        <h1>Update Provider Details</h1>
        <div className="mb-3">
          <label htmlFor="providerId" className="form-label">Enter Provider ID:</label>
          <input
            type="text"
            id="providerId"
            name="providerId"
            className="form-control"
            value={providerId}
            onChange={this.handleChange}
            placeholder="P001"
          />
          {inputError && <div className="text-danger">{inputError}</div>}
          <button className="btn btn-primary mt-2" onClick={this.FetchProviderId}>
            Fetch Provider
          </button>
        </div>

        {loading && <div>Loading provider...</div>}

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
              <label htmlFor="providerName" className="form-label">Provider Name:</label>
              <input
                type="text"
                id="providerName"
                name="providerName"
                className="form-control"
                value={providerName}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contactNumber" className="form-label">Contact Number:</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                className="form-control"
                value={contactNumber}
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
              <label htmlFor="providerType" className="form-label">Provider Type:</label>
              <input
                type="text"
                id="providerType"
                name="providerType"
                className="form-control"
                value={providerType}
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

            <button className="btn btn-success mt-2" onClick={this.updateProvider}>
              Update Provider
            </button>
          </div>
        )}

        {updateSuccess && <div className="text-success">{updateSuccess}</div>}
      </div>
    );
  }
}
