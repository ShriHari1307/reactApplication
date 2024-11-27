import React, { Component } from 'react'

export default class DeleteAgent extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           providerId:"",
           agentId: null,
           agents:""
        }
      }
    
      validateAgent = (e) => {
        const value = e.target.value;
        const regex = /^[Aa][0-9]{3,6}$/;
        const errorMessage = !regex.test(value) ? 'Agent ID should be of the format [Axxx] where x is a digit.': '';
        this.setState({
          agentId: value,
          loading:false,
          inputError: errorMessage,
        });
      };
      
      componentDidMount(){
        const fetchAgents = () =>
          new Promise((resolve, reject) => {
            fetch("http://localhost:8080/agents", {
              method: "GET",
              headers: {
                "X-Custom-Header": "validHeaderValue",
              },
            })
              .then((response) => {
                if (!response.ok) {
                  return response.json().then((error) => reject(error.message));
                }
                return response.json();
              })
              .then((data) => resolve(data.data))
              .catch((error) => reject(error.message));
          });
          fetchAgents()
          .then((data) => {
            this.setState({
              agents: data,
              loading: false,
            });
          })
          .catch((errorMessage) => {
            this.setState({
              error: errorMessage,
              loading: false,
            });
          });
      }
    
      handleDelete = () => {
        const { agentId } = this.state;
      
        if (!agentId) {
          this.setState({ inputError: "Please enter a valid Agent ID." });
          return;
        }
      
        fetch(`http://localhost:8080/agents/deleteAgent/${agentId}`, {
          method: "DELETE",
          headers: {
            "X-Custom-Header": "validHeaderValue",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to delete Agent. Status: ${response.status}`);
            }
            return response.text(); 
          })
          .then(() => {
            this.setState({
              agents: this.state.agents.filter(
                (agent) => agent.agentId !== agentId
              ),
              agentId: "",
              inputError: "", 
            });
            alert("Agent deleted successfully!");
          })
          .catch((error) => {
            console.error("Error deleting Agents:", error.message);
            this.setState({ inputError: error.message });
          });
      };
      
      
      render() {
        const {agentId,inputError} = this.state
        return (
          <div>
            <h1>Delete Agent</h1>
            <div className="mb-3">
              <label htmlFor="agentId" className="form-label">Enter Agent ID:</label>
              <input
                type="text"
                id="agentId"
                className="form-control"
                value={agentId}
                onChange={this.validateAgent}
                placeholder="A001"
              />
              {inputError && <div className="text-danger">{inputError}</div>}
              <button className="btn btn-primary mt-2" onClick={this.handleDelete}>
                Delete Agent
              </button>
            </div>
          </div>
        )
      }
}
