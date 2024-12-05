import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class UpdateProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerNameSearch: '',
      providerName: '',
      contactNumber: '',
      email: '',
      matchingProviders: [],
      selectedProvider: null,
      providerNameError: '',
      contactNumberError: '',
      emailError: '',
      validationError: '',
      validationCard: false,
      successVisible: false,
      updateSuccess: '',
      errorCardVisible: false,
      errorMessage: '',
      showForm: false,
      noProviderFound: false,
      searchErrorCard: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateProviderName = (e) => {
    const value = e.target.value;
    let providerNameError = '';
    if (!value) {
      providerNameError = 'Provider Name is required';
    }
    this.setState({ providerNameError });
  };

  validateContactNumber = (e) => {
    const value = e.target.value;
    let contactNumberError = '';
    const regex = /^[0-9]{10}$/;
    if (!value) {
      contactNumberError = 'Contact Number is required';
    } else if (!regex.test(value)) {
      contactNumberError = 'Invalid Contact Number';
    }
    this.setState({ contactNumberError });
  };

  validateEmail = (e) => {
    const value = e.target.value;
    let emailError = '';
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) {
      emailError = 'Email is required';
    } else if (!regex.test(value)) {
      emailError = 'Invalid Email';
    }
    this.setState({ emailError });
  };

  handleSearch = async () => {
    const { providerNameSearch } = this.state;

    if (!providerNameSearch.trim()) {
      this.setState({ searchErrorCard: true });
      return;
    }

    this.setState({ searchErrorCard: false });

    try {
      const response = await axios.get('http://localhost:8080/provider/search', {
        params: { name: providerNameSearch },
      });

      if (response.data.length === 0) {
        this.setState({
          matchingProviders: [],
          noProviderFound: true,
          showForm: false,
        });
      } else {
        this.setState({
          matchingProviders: response.data,
          noProviderFound: false,
          showForm: false,
        });
      }
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  handleUpdate = (provider) => {
    this.setState({
      selectedProvider: provider,
      providerName: provider.providerName,
      contactNumber: provider.contactNumber,
      email: provider.email,
      showForm: true,
    });
  };

  updateProvider = async () => {
    const { providerName, contactNumber, email, selectedProvider, } = this.state;

    this.validateProviderName({ target: { value: providerName } });
    this.validateContactNumber({ target: { value: contactNumber } });
    this.validateEmail({ target: { value: email } });

    const hasValidationErrors = [
      this.state.providerNameError,
      this.state.contactNumberError,
      this.state.emailError,
    ].some((error) => error !== '');

    if (hasValidationErrors) {
      this.setState({
        validationError: 'Please fix all the validation errors before submitting.',
        validationCard: true,
      });

      setTimeout(() => {
        this.setState({ validationCard: false });
      }, 3000);

      return;
    }

    try {
      const updatedDetails = {
        ...selectedProvider,
        providerName,
        contactNumber,
        email,
      };

      await axios.put(
        `http://localhost:8080/provider/update/${selectedProvider.providerId}`,
        updatedDetails
      );

      this.setState({
        successVisible: true,
        updateSuccess: 'Provider updated successfully!',
        showForm: false,
      });

      setTimeout(() => {
        this.setState({
          providerNameSearch: '',
          providerName: '',
          contactNumber: '',
          email: '',
          matchingProviders: [],
          selectedProvider: null,
          successVisible: false,
        });
      }, 3000);
    } catch (error) {
      console.error('Error updating provider:', error);

      this.setState({
        errorCardVisible: true,
        errorMessage: 'An error occurred while updating provider details.',
        showForm: false,
      });

      setTimeout(() => {
        this.setState({
          errorCardVisible: false,
          errorMessage: '',
        });
      }, 3000);
    }
  };

  render() {
    const {
      providerNameSearch,
      providerName,
      contactNumber,
      email,
      matchingProviders,
      providerNameError,
      contactNumberError,
      emailError,
      validationError,
      validationCard,
      successVisible,
      updateSuccess,
      errorCardVisible,
      errorMessage,
      showForm,
      noProviderFound,
      searchErrorCard,
      
    } = this.state;

    return (
      <div className="container mt-5">
        <h2>Update Provider</h2>
        <div className="form-group">
          <label htmlFor="providerNameSearch">Search Provider by Name:</label>
          <input
            type="text"
            className="form-control"
            id="providerNameSearch"
            name="providerNameSearch"
            value={providerNameSearch}
            onChange={this.handleInputChange}
            placeholder="Enter provider name"
          />
        </div>
        <button onClick={this.handleSearch} className="btn btn-primary">
          Search
        </button>
        {searchErrorCard && (
          <div className="alert alert-danger mt-2">
            <strong>Error:</strong> Search field cannot be empty.
          </div>
        )}
        {noProviderFound && (
          <div className="alert alert-warning mt-2">
            <strong>No providers found matching the name.</strong>
          </div>
        )}

        {matchingProviders.length > 0 && (
          <div className="card shadow p-4 mb-4 mt-4">
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
                    onClick={() => this.handleUpdate(provider)}
                  >
                    Update
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showForm && (
          <div className="mt-4">
            <h4>Edit Provider Details</h4>
            <div className="form-group">
              <label htmlFor="providerName">Provider Name:</label>
              <input
                type="text"
                className="form-control"
                id="providerName"
                name="providerName"
                value={providerName}
                onChange={this.handleInputChange}
                onBlur={this.validateProviderName}
              />
              {providerNameError && (
                <small className="text-danger">{providerNameError}</small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                type="text"
                className="form-control"
                id="contactNumber"
                name="contactNumber"
                value={contactNumber}
                onChange={this.handleInputChange}
                onBlur={this.validateContactNumber}
              />
              {contactNumberError && (
                <small className="text-danger">{contactNumberError}</small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={this.handleInputChange}
                onBlur={this.validateEmail}
              />
              {emailError && (
                <small className="text-danger">{emailError}</small>
              )}
            </div>
            <button onClick={this.updateProvider} className="btn btn-success">
              Update
            </button>

            {validationCard && (
              <div className="alert alert-danger mt-3">{validationError}</div>
            )}

            {successVisible && (
              <div className="alert alert-success mt-3">{updateSuccess}</div>
            )}

            {errorCardVisible && (
              <div className="alert alert-danger mt-3">{errorMessage}</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default UpdateProvider;
