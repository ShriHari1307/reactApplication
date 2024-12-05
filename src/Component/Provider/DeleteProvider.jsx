import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class DeleteProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerName: '',
      providerNameError: "",
      matchingProviders: [],
      successVisible: false,
      selectedProviderId: null,
      selectedProviderName: '',
      providerNotFoundVisible: false,
      enterProviderNameVisible: false,
      updateSuccess: 'Provider deleted successfully!',
      loading: false,
      showModal: false,
      validationError: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ providerName: e.target.value });
  };

  validateProviderName = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z ]+$/;
    this.setState({
      providerName: value,
      providerNameError:
        value && !regex.test(value)
          ? "Provider name cannot contain numbers or special characters"
          : ""
    });
  };

  fetchProvidersByName = async () => {
    const { providerName,providerNameError } = this.state;

    if (providerNameError) {
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
    
    if (!providerName.trim()) {
      this.setState({
        enterProviderNameVisible: true,
        providerNotFoundVisible: false,
        matchingProviders: [],
      },
      () => {
        setTimeout(() => {
          this.setState({ validationError: "" });
        }, 2000);
      });
      return;
    }
    

    this.setState({ loading: true, enterProviderNameVisible: false,validationError:""});

    try {
      const response = await axios.get('http://localhost:8080/provider/search', {
        params: { name: providerName },
      });

      if (response.data.length === 0) {
        this.setState({
          matchingProviders: [],
          providerNotFoundVisible: true,
          loading: false,
        });
        return;
      }

      this.setState({
        matchingProviders: response.data,
        providerNotFoundVisible: false,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching providers:", error);
      this.setState({
        matchingProviders: [],
        providerNotFoundVisible: true,
        loading: false,
      });
    }
  };

  handleDeleteConfirmation = (providerId, providerName) => {
    this.setState({
      showModal: true,
      selectedProviderId: providerId,
      selectedProviderName: providerName,
    });
  };

  // Handle provider deletion by ID
  handleDelete = async () => {
    const { selectedProviderId } = this.state;

    this.setState({ loading: true, showModal: false });

    try {
      const response = await axios.delete(`http://localhost:8080/provider/deleteProvider/${selectedProviderId}`);

      if (response.status !== 200) {
        throw new Error('Failed to delete provider');
      }

      this.setState({
        providerName: '',
        matchingProviders: [],
        successVisible: true,
        providerNotFoundVisible: false,
        enterProviderNameVisible: false,
        selectedProviderId: null,
        selectedProviderName: '',
        loading: false,
        
      });

      setTimeout(() => {
        this.setState({ successVisible: false });
      }, 3000);
    } catch (error) {
      console.error("Error deleting provider:", error);
      this.setState({
        providerNotFoundVisible: true,
        loading: false,
      });
    }
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedProviderId: null, selectedProviderName: '' });
  };

  render() {
    const {
      providerName,
      matchingProviders,
      successVisible,
      providerNotFoundVisible,
      enterProviderNameVisible,
      loading,
      showModal,
      selectedProviderName,
      validationError,
    } = this.state;

    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Provider Management</h2>

        {/* Search Section */}
        <div className="card shadow p-4 mb-4">
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
              value={providerName}
              onChange={this.validateProviderName}
              placeholder="Enter provider name"
            />
            {this.state.providerNameError && (
                        <div className="text-danger">
                          {this.state.providerNameError}
                        </div>
                      )}
            <button
              className="btn btn-primary mt-3"
              onClick={this.fetchProvidersByName}
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Error and Empty Results Messages */}
        {enterProviderNameVisible && (
          <div className="alert alert-warning mt-3">Please enter a provider name.</div>
        )}

        {providerNotFoundVisible && (
          <div className="alert alert-danger mt-3">No provider found with the given name.</div>
        )}

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
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDeleteConfirmation(provider.providerId, provider.providerName)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Success Message */}
        {successVisible && (
          <div className="alert alert-success mt-3">{this.state.updateSuccess}</div>
        )}

        {/* Confirmation Modal */}
        {showModal && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Deletion</h5>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete the provider: {selectedProviderName}?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={this.closeModal}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-danger" onClick={this.handleDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
