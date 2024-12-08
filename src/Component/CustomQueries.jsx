import React, { Component } from "react";
import axios from "axios";

export default class CustomQueries extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.stateMapping = {
      1: {
        name: "Tamil Nadu",
        cities: {
          1: "Chennai",
          2: "Coimbatore",
          3: "Madurai",
          4: "Salem",
          5: "Trichy",
        },
      },
      2: {
        name: "West Bengal",
        cities: {
          6: "Kolkata",
          7: "Durgapur",
          8: "Siliguri",
          9: "Asansol",
          10: "Howrah",
        },
      },
      3: {
        name: "Karnataka",
        cities: {
          11: "Bangalore",
          12: "Mysore",
          13: "Hubli",
          14: "Mangalore",
          15: "Bellary",
        },
      },
      4: {
        name: "Maharashtra",
        cities: {
          16: "Mumbai",
          17: "Pune",
          18: "Nagpur",
          19: "Nashik",
          20: "Aurangabad",
        },
      },
    };
  }

  state = {
    queryResults: null,
    currentQuery: "",
    error: null,
    loading: false,
  };

  fetchQueryResults(endpoint, queryName) {
    this.setState({ loading: true, error: null });

    axios
      .get(`http://localhost:8080/provider/${endpoint}`)
      .then((response) => {
        this.setState({
          queryResults: response.data,
          currentQuery: queryName,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }

  getStateName = (stateId) => {
    return this.stateMapping[stateId]?.name || "Unknown State";
  };

  getCityName = (stateId, cityId) => {
    const state = this.stateMapping[stateId];
    if (!state) return "Unknown City";
    return state.cities[cityId] || "Unknown City";
  };

  componentDidMount() {
    this.fetchProvidersAndAgents();
  }

  fetchProvidersAndAgents = async () => {
    try {
      // Fetch providers
      const providersResponse = await axios.get(
        "http://localhost:8080/provider",
        {
          headers: { "X-Custom-Header": "validHeaderValue" },
        }
      );

      // Fetch all agents
      const agentsResponse = await axios.get("http://localhost:8080/agents", {
        headers: { "X-Custom-Header": "validHeaderValue" },
      });

      // Create a map of agent IDs to agent details
      const agentsMap = agentsResponse.data.data.reduce((acc, agent) => {
        acc[agent.agentId] = agent;
        return acc;
      }, {});

      this.setState({
        providers: providersResponse.data.data,
        agentsMap: agentsMap,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  };

  renderAgents = (agentIds) => {
    const { agentsMap } = this.state;
    return agentIds.map((agentId, index) => {
      const agent = agentsMap[agentId];
      if (agent) {
        const isLastAgent = index === agentIds.length - 1;
        return (
          <span key={index}>
            {agent.firstName} {agent.lastName}
            {!isLastAgent && ", "}
          </span>
        );
      }
      return null;
    });
  };

  render() {
    const { queryResults, currentQuery, error, loading } = this.state;

    const queryList = [
      { name: "Selected Columns", endpoint: "ProjectionInterface" },
      { name: "Count Providers", endpoint: "countProvider" },
      { name: "Minimum Agents", endpoint: "providersWithMinimumAgents" },
      { name: "Providers by State", endpoint: "countProviderByState" },
      { name: "Ordered Names & Emails", endpoint: "ProviderByOrder" },
      { name: "Inner Join Providers", endpoint: "innerJoin" },
      { name: "Left Join Providers", endpoint: "leftJoin" },
      { name: "Right Join Providers", endpoint: "rightJoin" },
      { name: "Cross Join Providers", endpoint: "crossJoin" },
      { name: "Named Query 1", endpoint: "namedQuery1" },
      { name: "Named Query 2", endpoint: "namedQuery2" },
    ];

    return (
      <div style={{ padding: "20px" }}>
        <h1>Custom Queries</h1>
        <div className="d-flex flex-wrap justify-content-center mb-4">
  {queryList.map((query, index) => (
    <button
      key={index}
      onClick={() => this.fetchQueryResults(query.endpoint, query.name)}
      className="btn btn-primary btn-lg m-2 px-4 py-2 shadow hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
    >
      {query.name}
    </button>
  ))}
</div>

        <div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {queryResults && currentQuery === "Selected Columns" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p>
                <strong>Purpose:</strong> This table is for Projection Interface
              </p>
              <table className="table table-bordered table-striped table-hover mt-4">
                <thead style={{ backgroundColor: "#007BFF", color: "#fff" }}>
                  <tr>
                    <th>Provider Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {queryResults.data &&
                    Array.isArray(queryResults.data) &&
                    queryResults.data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.providerName}</td>
                        <td>{item.email}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
          {queryResults && currentQuery === "Count Providers" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p>
                <strong>Purpose:</strong> This is for counting the total number
                of providers
              </p>
              <div
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3>Total Providers: {queryResults.data}</h3>
              </div>
            </div>
          )}
          {queryResults && currentQuery === "Minimum Agents" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p>
                <strong>Purpose: </strong>This table is to display the providers
                with minimum agents
              </p>
              <table className="table table-bordered table-striped table-hover mt-4">
                <thead className="thead-dark">
                  <tr>
                    <th>Provider Name</th>
                    <th>Contact Number</th>
                    <th>Email</th>
                    <th>Provider Type</th>
                    <th>Street</th>
                  </tr>
                </thead>
                <tbody>
                  {queryResults.data && queryResults.data.length > 0 ? (
                    queryResults.data.map((provider, index) => (
                      <tr key={index}>
                        <td>{provider.providerName}</td>
                        <td>{provider.contactNumber}</td>
                        <td>{provider.email}</td>
                        <td>{provider.providerType}</td>
                        <td>{provider.street}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {queryResults && currentQuery === "Providers by State" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p>
                <strong>Purpose:</strong> This is for displaying the total
                number of providers for each state
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                {queryResults.data.map((state, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#007BFF",
                      color: "#fff",
                      padding: "20px",
                      borderRadius: "8px",
                      textAlign: "center",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3>{state.stateName}</h3>
                    <p>{state.providerCount} Providers</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {queryResults && currentQuery === "Ordered Names & Emails" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p>
                <strong>Purpose:</strong> This is for ordering the names in
                Ascending order
              </p>
              <div
                className="p-4 mb-4"
                style={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  textAlign: "left",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                {queryResults.data.map((row, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <strong>{row.providerName}</strong>
                      <span className="text-muted">{row.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {queryResults && currentQuery === "Inner Join Providers" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p>
                <strong>Purpose:</strong> This table is for Inner Join
              </p>
              <table
                className="table table-bordered table-striped table-hover mt-4"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <thead
                  className="thead-dark"
                  style={{ backgroundColor: "#007BFF" }}
                >
                  <tr>
                    <th>Provider Name</th>
                    <th>contact</th>
                    <th>Email</th>
                    <th>Provider Type</th>
                    <th>street</th>
                    <th>city ID</th>
                    <th>state ID</th>
                    <th>Agent Ids</th>
                  </tr>
                </thead>
                <tbody>
                  {queryResults.data && queryResults.data.length > 0 ? (
                    queryResults.data.map((provider, index) => (
                      <tr key={index}>
                        <td>{provider.providerName}</td>
                        <td>{provider.contactNumber}</td>
                        <td>{provider.email}</td>
                        <td>{provider.providerType}</td>
                        <td>{provider.street}</td>
                        <td>
                          {this.getCityName(provider.stateId, provider.cityId)}
                        </td>
                        <td>{this.getStateName(provider.stateId)}</td>
                        <td>
                          {provider.agentIds.length > 0 ? (
                            <div className="list-group mt-2">
                              {this.renderAgents(provider.agentIds)}
                            </div>
                          ) : (
                            <p className="text-muted">No agents assigned</p>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {queryResults && currentQuery === "Left Join Providers" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p>
                <strong>Purpose:</strong> This table is for Left Join
              </p>
              <table
                className="table table-bordered table-striped table-hover mt-4"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <thead
                  className="thead-dark"
                  style={{ backgroundColor: "#007BFF" }}
                >
                  <tr>
                    <th>Provider Name</th>
                    <th>contact</th>
                    <th>Email</th>
                    <th>Provider Type</th>
                    <th>street</th>
                    <th>city ID</th>
                    <th>state ID</th>
                    <th>Agent Ids</th>
                  </tr>
                </thead>
                <tbody>
                  {queryResults.data && queryResults.data.length > 0 ? (
                    queryResults.data.map((provider, index) => (
                      <tr key={index}>
                        <td>{provider.providerName}</td>
                        <td>{provider.contactNumber}</td>
                        <td>{provider.email}</td>
                        <td>{provider.providerType}</td>
                        <td>{provider.street}</td>
                        <td>
                          {this.getCityName(provider.stateId, provider.cityId)}
                        </td>
                        <td>{this.getStateName(provider.stateId)}</td>
                        <td>
                          {provider.agentIds.length > 0 ? (
                            <div className="list-group mt-2">
                              {this.renderAgents(provider.agentIds)}
                            </div>
                          ) : (
                            <p className="text-muted">No agents assigned</p>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {queryResults && currentQuery === "Right Join Providers" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p>
                <strong>Purpose:</strong> This table is for Right Join
              </p>
              <table
                className="table table-bordered table-striped table-hover mt-4"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <thead
                  className="thead-dark"
                  style={{ backgroundColor: "#007BFF" }}
                >
                  <tr>
                    <th>Provider Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Provider Type</th>
                    <th>Street</th>
                    <th>City ID</th>
                    <th>State ID</th>
                    <th>Agent IDs</th>
                  </tr>
                </thead>
                <tbody>
                  {queryResults.data && queryResults.data.length > 0 ? (
                    queryResults.data.map((provider, index) =>
                      provider ? (
                        <tr key={index}>
                          <td>{provider.providerName || "No Name"}</td>
                          <td>{provider.contactNumber || "No Contact"}</td>
                          <td>{provider.email || "No Email"}</td>
                          <td>{provider.providerType || "No Type"}</td>
                          <td>{provider.street || "No Street"}</td>
                          <td>
                            {this.getCityName(
                              provider.stateId,
                              provider.cityId
                            ) || "No City ID"}
                          </td>
                          <td>
                            {this.getStateName(provider.stateId) ||
                              "No State ID"}
                          </td>
                          <td>
                            {provider.agentIds.length > 0 ? (
                              <div className="list-group mt-2">
                                {this.renderAgents(provider.agentIds)}
                              </div>
                            ) : (
                              <p className="text-muted">No agents assigned</p>
                            )}
                          </td>
                        </tr>
                      ) : null
                    )
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {queryResults && currentQuery === "Cross Join Providers" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p>
                <strong>Purpose:</strong> This table is for Cross Join
              </p>
              <div
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                <table
                  className="table table-bordered table-striped table-hover mt-4"
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <thead
                    className="thead-dark"
                    style={{ backgroundColor: "#007BFF" }}
                  >
                    <tr>
                      <th>Provider Name</th>
                      <th>Agent First Name</th>
                      <th>Provider Email</th>
                      <th>Agent Last Name</th>
                      <th>Agent Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryResults.data && queryResults.data.length > 0 ? (
                      queryResults.data.map((provider, index) => (
                        <tr key={index}>
                          <td>{provider.providerName}</td>
                          <td>{provider.agentFirstName}</td>
                          <td>{provider.providerEmail}</td>
                          <td>{provider.agentLastName}</td>
                          <td>{provider.agentEmail}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {queryResults && currentQuery === "Named Query 1" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p>
                <strong>Purpose:</strong> This table is for displaying the
                providers based on the creation date{" "}
              </p>
              <table
                className="table table-bordered table-striped table-hover mt-4"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <thead
                  className="thead-dark"
                  style={{ backgroundColor: "#007BFF" }}
                >
                  <tr>
                    <th>Provider Name</th>
                    <th>contact</th>
                    <th>Email</th>
                    <th>Provider Type</th>
                    <th>street</th>
                    <th>city ID</th>
                    <th>state ID</th>
                    <th>Agent Ids</th>
                  </tr>
                </thead>
                <tbody>
                  {queryResults.data && queryResults.data.length > 0 ? (
                    queryResults.data.map((provider, index) => (
                      <tr key={index}>
                        <td>{provider.providerName}</td>
                        <td>{provider.contactNumber}</td>
                        <td>{provider.email}</td>
                        <td>{provider.providerType}</td>
                        <td>{provider.street}</td>
                        <td>
                          {this.getCityName(provider.stateId, provider.cityId)}
                        </td>
                        <td>{this.getStateName(provider.stateId)}</td>
                        <td>
                          {provider.agentIds.length > 0 ? (
                            <div className="list-group mt-2">
                              {this.renderAgents(provider.agentIds)}
                            </div>
                          ) : (
                            <p className="text-muted">No agents assigned</p>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {queryResults && currentQuery === "Named Query 2" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p>
                <strong>Purpose:</strong> This table is for displaying only the
                providers who have agents
              </p>
              <table
                className="table table-bordered table-striped table-hover mt-4"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <thead
                  className="thead-dark"
                  style={{ backgroundColor: "#007BFF" }}
                >
                  <tr>
                    <th>Provider Name</th>
                    <th>contact</th>
                    <th>Email</th>
                    <th>Provider Type</th>
                    <th>street</th>
                    <th>city ID</th>
                    <th>state ID</th>
                    <th>Agent Ids</th>
                  </tr>
                </thead>
                <tbody>
                  {queryResults.data && queryResults.data.length > 0 ? (
                    queryResults.data.map((provider, index) => (
                      <tr key={index}>
                        <td>{provider.providerName}</td>
                        <td>{provider.contactNumber}</td>
                        <td>{provider.email}</td>
                        <td>{provider.providerType}</td>
                        <td>{provider.street}</td>
                        <td>
                          {this.getCityName(provider.stateId, provider.cityId)}
                        </td>
                        <td>{this.getStateName(provider.stateId)}</td>
                        <td>
                          {provider.agentIds.length > 0 ? (
                            <div className="list-group mt-2">
                              {this.renderAgents(provider.agentIds)}
                            </div>
                          ) : (
                            <p className="text-muted">No agents assigned</p>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}
