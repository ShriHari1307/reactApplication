import React, { Component } from 'react';

export default class HomePage extends Component {
  state = {
    agentsCount: 0,
    providersCount: 0,
    isLoading: true,
    error: null,
    hoverEffect1: false,
    hoverEffect2: false,
  };

  componentDidMount() {
    this.fetchCounts();
  }

  fetchCounts = () => {
    fetch('http://localhost:8080/agents/count')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch agent count');
        }
        return response.json();
      })
      .then((agentsData) => {
        fetch('http://localhost:8080/provider/count')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch provider count');
            }
            return response.json();
          })
          .then((providersData) => {
            this.setState({
              agentsCount: agentsData,
              providersCount: providersData,
              isLoading: false,
            });
          })
          .catch((error) => {
            this.setState({
              error: `Error fetching providers: ${error.message}`,
              isLoading: false,
            });
          });
      })
      .catch((error) => {
        this.setState({
          error: `Error fetching agents: ${error.message}`,
          isLoading: false,
        });
      });
  };

  toggleHover = (cardNumber, isHovering) => {
    this.setState({ [cardNumber]: isHovering });
  };

  render() {
    const {
      agentsCount,
      providersCount,
      isLoading,
      error,
      hoverEffect1,
      hoverEffect2,
    } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="container mt-4">
        <div className="text-center mb-5">
          <h1 className="display-4">Welcome to Insurance Agent Management</h1>
          <p className="lead">
            Simplify your agent management process with our powerful management system.
          </p>
        </div>
        <div className="row text-center">
          <div className="col-md-6 mb-4">
            <div
              className="card shadow-sm border-primary"
              style={{
                transform: hoverEffect1 ? 'translateY(-10px)' : 'translateY(0)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={() => this.toggleHover('hoverEffect1', true)}
              onMouseLeave={() => this.toggleHover('hoverEffect1', false)}
            >
              <div className="card-body">
                <h5 className="card-title">Number of Agents</h5>
                <p className="display-4">{agentsCount}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div
              className="card shadow-sm border-success"
              style={{
                transform: hoverEffect2 ? 'translateY(-10px)' : 'translateY(0)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={() => this.toggleHover('hoverEffect2', true)}
              onMouseLeave={() => this.toggleHover('hoverEffect2', false)}
            >
              <div className="card-body">
                <h5 className="card-title">Number of Providers</h5>
                <p className="display-4">{providersCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
