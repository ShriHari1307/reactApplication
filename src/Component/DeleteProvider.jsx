import React, { Component } from 'react'

export default class DeleteProvider extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       agentId:"",
       providerId: null,
       providers:""
    }
  }

  validateProvider = (e) => {
    const value = e.target.value;
    const regex = /^[Pp][0-9]{3,6}$/;
    const errorMessage = !regex.test(value) ? 'Provider ID should be of the format [Pxxx] where x is a digit.': '';
    this.setState({
      providerId: value,
      loading:false,
      inputError: errorMessage,
    });
  };
  
  componentDidMount(){
    const fetchProviders = () =>
      new Promise((resolve, reject) => {
        fetch("http://localhost:8080/provider", {
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
      fetchProviders()
      .then((data) => {
        this.setState({
          providers: data,
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
    const { providerId } = this.state;
  
    if (!providerId) {
      this.setState({ inputError: "Please enter a valid Provider ID." });
      return;
    }
  
    fetch(`http://localhost:8080/provider/deleteProvider/${providerId}`, {
      method: "DELETE",
      headers: {
        "X-Custom-Header": "validHeaderValue",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete provider. Status: ${response.status}`);
        }
        return response.text(); 
      })
      .then(() => {
        this.setState({
          providers: this.state.providers.filter(
            (provider) => provider.providerId !== providerId
          ),
          providerId: "",
          inputError: "", 
        });
        alert("Provider deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting provider:", error.message);
        this.setState({ inputError: error.message });
      });
  };
  
  
  render() {
    const {providerId,inputError} = this.state
    return (
      <div>
        <h1>Delete Provider</h1>
        <div className="mb-3">
          <label htmlFor="agentId" className="form-label">Enter Provider ID:</label>
          <input
            type="text"
            id="providerId"
            className="form-control"
            value={providerId}
            onChange={this.validateProvider}
            placeholder="p001"
          />
          {inputError && <div className="text-danger">{inputError}</div>}
          <button className="btn btn-primary mt-2" onClick={this.handleDelete}>
            Delete Provider
          </button>
        </div>
      </div>
    )
  }
}
