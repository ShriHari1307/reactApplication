import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap

class NaviBar extends Component {
  render() {
    return (
      <div className="d-flex align-items-center" style={{ height: '70px' }}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            width: '100px',
            height: '70px',
            backgroundColor: '#007bff', 
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          <img src="logo.jpg" alt="logo" style={{ height:'100%', width:'100%'}} />
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: '70px',
            backgroundColor: '#28a745', 
            width:'100%',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Header
        </div>
      </div>
    );
  }
}

export default NaviBar;
