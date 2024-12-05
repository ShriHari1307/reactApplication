import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class DeleteAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agentName: '',
      agentNameError: "",
      matchingAgents: [],
      successVisible: false,
      selectedAgent: null,
      agentNotFoundVisible: false,
      enterAgentNameVisible: false,
      updateSuccess: 'Agent deleted successfully!',
      loading: false,
      showModal: false,
      validationError: "",
    };
  }

  // Handle input change for agent name
  handleInputChange = (e) => {
    this.setState({ agentName: e.target.value });
  };

  validateAgentName = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z ]+$/;
    this.setState({
      agentName: value,
      agentNameError:
        value && !regex.test(value)
          ? "Agent name cannot contain numbers or special characters"
          : ""
    });
  };

  // Fetch matching agents based on name using axios
  fetchAgentsByName = async () => {
    const { agentName,agentNameError } = this.state;

    if (agentNameError) {
      this.setState({
        enterAgentNameVisible: false, 
        agentNotFoundVisible: false,
        matchingAgents: [],
        validationError: "Please fix the error before searching",
      },
      () => {
        setTimeout(() => {
          this.setState({ validationError: "" });
        }, 2000);
      });
      return;
    }

    if (!agentName.trim()) {
      this.setState({
        enterAgentNameVisible: true,
        agentNotFoundVisible: false,
        matchingAgents: [],
      },
      () => {
        setTimeout(() => {
          this.setState({ validationError: "" });
        }, 2000);
      });
      return;
    }
    

    this.setState({ loading: true, enterAgentNameVisible: false,validationError:"" });

    try {
      const response = await axios.get('http://localhost:8080/agents/search', {  
        params: { firstName: agentName },
      });

      if (response.data.length === 0) {
        this.setState({
          matchingAgents: [],
          agentNotFoundVisible: true,
          loading: false,
        });
        return;
      }

      this.setState({
        matchingAgents: response.data,
        agentNotFoundVisible: false,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching agents:", error);
      this.setState({
        matchingAgents: [],
        agentNotFoundVisible: true,
        loading: false,
      });
    }
  };

  // Show confirmation modal
  handleDeleteConfirmation = (agent) => {
    this.setState({ showModal: true, selectedAgent: agent });
  };

  // Handle agent deletion
  handleDelete = async () => {
    const { selectedAgent } = this.state;

    this.setState({ loading: true, showModal: false });

    try {
      const response = await axios.delete(`http://localhost:8080/agents/deleteAgent/${selectedAgent.agentId}`);

      if (response.status !== 200) {
        throw new Error('Failed to delete agent');
      }

      // Reset the state after deletion
      this.setState({
        agentName: '',
        matchingAgents: [],
        successVisible: true,
        agentNotFoundVisible: false,
        enterAgentNameVisible: false,
        selectedAgent: null,
        loading: false,
      });

      setTimeout(() => {
        this.setState({ successVisible: false });
      }, 3000);
    } catch (error) {
      console.error("Error deleting agent:", error);
      this.setState({
        agentNotFoundVisible: true,
        loading: false,
      });
    }
  };

  // Close the modal
  closeModal = () => {
    this.setState({ showModal: false, selectedAgent: null });
  };

  render() {
    const {
      agentName,
      matchingAgents,
      successVisible,
      agentNotFoundVisible,
      enterAgentNameVisible,
      loading,
      showModal,
      validationError,
    } = this.state;

    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Agent Management</h2>

        {/* Search Section */}
        <div className="card shadow p-4 mb-4">
          <div className="form-group">
            <label htmlFor="agentName" className="form-label">
              Enter Agent Name:
            </label>
            {validationError && ( 
                  <div className="alert alert-danger">
                    <strong>{validationError}</strong>
                  </div>
                )}
            <input
              type="text"
              className="form-control"
              id="agentName"  
              value={agentName}
              onChange={this.validateAgentName}
              placeholder="Enter agent name" 
            />
            {this.state.agentNameError && (
                        <div className="text-danger">
                          {this.state.agentNameError}
                        </div>
                      )}
            <button
              className="btn btn-primary mt-3"
              onClick={this.fetchAgentsByName}  
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Error and Empty Results Messages */}
        {enterAgentNameVisible && (
          <div className="alert alert-warning mt-3">Please enter an agent name.</div>  
        )}

        {agentNotFoundVisible && (
          <div className="alert alert-danger mt-3">No agent found with the given name.</div>  
        )}

        {/* Matching Agents Section */}
        {matchingAgents.length > 0 && ( 
          <div className="card shadow p-4 mb-4">
            <h3 className="text-center mb-4">Matching Agents</h3>  
            <ul className="list-group">
              {matchingAgents.map((agent) => ( 
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={agent.agentId} 
                >
                  {agent.firstName}  {agent.lastName}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDeleteConfirmation(agent)}  
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
                  <p>Are you sure you want to delete the agent: {this.state.selectedAgent.firstName} {this.state.selectedAgent.lastName}</p> 
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