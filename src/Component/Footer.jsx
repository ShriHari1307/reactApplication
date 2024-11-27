import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <div className="d-flex align-items-center " style={{height:'70px' ,backgroundColor: 'red', 
        color: 'white',justifyContent:'center', fontWeight:'bold'}} >
        <p>&copy; 2024 Insurance Agent Management System. All rights reserved.</p>
      </div>
    )
  }
}
    

