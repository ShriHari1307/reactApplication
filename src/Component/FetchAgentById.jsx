import React, { Component } from 'react'

export default class FetchAgentById extends Component {
    constructor(props) {
      super(props)
      this.state = {
         agentId:"",
         agent:null,
         loading: false,
         error: null,
         inputError:"",
      }
    }

    FetchAgentId = () => {
        const { agentId } = this.state;
        if (!agentId.trim()) {
          this.setState({ inputError: "Agent ID cannot be empty.", error: null });
          return;
        }

        this.setState({ loading: true, error: null, agent: null });
      
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
              agent: agentData,
              loading: false,
            });
          })
          .catch((error) => {
            this.setState({
              error: error.message,
              loading: false,
            });
          });
      };

      validateAgent = (e) => {
        const value = e.target.value;
        const regex = /^[Aa][0-9]{3,6}$/;
        const errorMessage = !regex.test(value) ? 'Agent ID should be of the format [Axxx] where x is a digit.': '';
        this.setState({
          agentId: value,
          inputError: errorMessage,
        });
      };
      
    
  render() {

    const { agentId, agent, loading, error, inputError } = this.state;

    return (
        <div>
        <h1>Agent Details</h1>
        <div className="mb-3">
          <label htmlFor="agentId" className="form-label">Enter Agent ID:</label>
          <input
            type="text"
            id="agentId"
            className="form-control"
            value={agentId}
            onChange={this.validateAgent}
            placeholder="a001"
          />
          {inputError && <div className="text-danger">{inputError}</div>}
          <button className="btn btn-primary mt-2" onClick={this.FetchAgentId}>
            Fetch Provider
          </button>
        </div>

        {loading && <div>Loading agent...</div>}

        {error && <div className="text-danger">Error: {error}</div>}

        {agent && (
          <div className="table-responsive" style={{ maxHeight: '550px' }}>
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Agent ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Contact Number</th>
                  <th>License Number</th>
                  <th>Date of Joining</th>
                  <th>Email</th>
                  <th>Street</th>
                  <th>City ID</th>
                  <th>State ID</th>
                  <th>Status</th>
                  <th>Provider IDs</th>
                </tr>
              </thead>
              <tbody>
                <tr key={agent.agentId}>
                  <td>{agent.agentId}</td>
                  <td>{agent.firstName}</td>
                  <td>{agent.lastName}</td>
                  <td>{agent.contact}</td>
                  <td>{agent.licenseNumber}</td>
                  <td>{agent.dateOfJoining.split("T")[0]}</td>
                  <td>{agent.email}</td>
                  <td>{agent.street}</td>
                  <td>{agent.cityId}</td>
                  <td>{agent.stateId}</td>
                  <td>{agent.status}</td>
                  <td>{agent.providerIds.length > 0 ? agent.providerIds.join(", ") : "No Providers"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}
