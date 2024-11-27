import React, { Component } from 'react';

export default class PageNotFound extends Component {
  render() {
    return (
      <div className="not-found text-center">
        <img 
          src="notfound.jpg" 
          alt="404" 
          className="img-fluid" 
          style={{ maxWidth: '50%', height: '50%' }} 
        />
      </div>
    );
  }
}
