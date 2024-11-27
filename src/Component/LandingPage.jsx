import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

export default class LandingPage extends Component {
  render() {
    return (
      <div style={{ fontFamily: 'Poppins, sans-serif' }}>

        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

            .typing {
              display: inline-block;
              font-size: 2.5rem;
              font-weight: 600;
              white-space: nowrap;
              overflow: hidden;
              border-right: 3px solid black;
              width: 0;
              animation: typing 4s steps(40) 1s 1 normal both, blink 0.75s step-end 4s 1 normal forwards;
            }

            @keyframes typing {
              0% {
                width: 0;
              }
              100% {
                width: 100%;
              }
            }

            @keyframes blink {
              50% {
                border-color: transparent;
              }
              100% {
                border-color: transparent;
              }
            }
          `}
        </style>

        <header className="d-flex justify-content-between align-items-center p-4 bg-dark text-white">
          <div className="logo">
            <img src="logo.jpg" alt="Logo" className="img-fluid w-25" />
          </div>
          <NavLink className="btn btn-success" to="/login">Login</NavLink>
        </header>

        <section className="text-center p-5 bg-light">
          <h1 className="mb-4 text-primary">
            <span className="typing">Welcome to the Insurance Agent Management System</span>
          </h1>
          <p className="text-muted" style={{ fontWeight: '400', fontSize: '1.1rem' }}>
            Our platform simplifies the management of insurance agents. 
            Easily track agents, monitor commissions, and assign them to providers, 
            all in one place. Streamline your administrative tasks and enhance agent 
            performance with ease.
          </p>
          <img 
            src="landing-image.png" 
            alt="Insurance Platform" 
            className="img-fluid rounded shadow-lg"
            style={{ maxWidth: '800px', transition: 'transform 0.3s ease' }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </section>

        <section className="p-5">
          <h2 className="text-center mb-4 text-primary" style={{ fontWeight: '600', fontSize: '2rem' }}>Key Features</h2>
          <div className="container">
            <div className="row text-center">

              <div className="col-md-4 mb-4 d-flex">
                <div className="p-4 bg-light rounded shadow-sm flex-grow-1 d-flex flex-column">
                  <img src="agent-reg.png" alt="Feature 1" className="img-fluid mb-3" />
                  <h3>Agent Registration</h3>
                  <p>Seamlessly register new agents and manage their personal and professional details.</p>
                </div>
              </div>

              <div className="col-md-4 mb-4 d-flex">
                <div className="p-4 bg-light rounded shadow-sm flex-grow-1 d-flex flex-column">
                  <img src="provider-assign.png" alt="Feature 2" className="img-fluid mb-3" />
                  <h3>Provider Assignment</h3>
                  <p>Assign agents to multiple insurance providers and track their activities.</p>
                </div>
              </div>

              <div className="col-md-4 mb-4 d-flex">
                <div className="p-4 bg-light rounded shadow-sm flex-grow-1 d-flex flex-column">
                  <img src="agent-mainte.png" alt="Feature 3" className="img-fluid mb-3" />
                  <h3>Easy Agent Tracking</h3>
                  <p>Quickly track agent performance, monitor their progress, and assess their efficiency in real-time.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-dark text-white py-5">
          <h2 className="text-center mb-4" style={{ fontWeight: '700', fontSize: '2rem' }}>What Our Clients Say</h2>
          <div className="container">
            <div className="row text-center">
              <div className="col-md-4 mb-4">
                <blockquote className="blockquote">
                  <p className="mb-3">"This system has revolutionized the way we manage our agents. It's intuitive, easy to use, and saves us a lot of time!"</p>
                  <footer className="blockquote-footer text-white">John Doe, <cite title="Source Title">Insurance Provider</cite></footer>
                </blockquote>
              </div>
              <div className="col-md-4 mb-4">
                <blockquote className="blockquote">
                  <p className="mb-3">"Managing commissions and tracking agent performance is now more efficient than ever. Highly recommended!"</p>
                  <footer className="blockquote-footer text-white">Jane Smith, <cite title="Source Title">Agency Owner</cite></footer>
                </blockquote>
              </div>
              <div className="col-md-4 mb-4">
                <blockquote className="blockquote">
                  <p className="mb-3">"The platform's design is sleek and functional, making our workflow smoother and more organized." </p>
                  <footer className="blockquote-footer text-white">Mary Johnson, <cite title="Source Title">HR Manager</cite></footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="p-5 bg-light">
          <h2 className="text-center mb-4 text-primary" style={{ fontWeight: '600', fontSize: '2rem' }}>Contact Us</h2>
          <div className="container">
            <div className="row">
              <div className="col-md-6 mb-4">
                <h4>Email</h4>
                <p>For inquiries or support, feel free to reach out to us at: <a href="mailto:shrihari1363@gmail.com">shrihari1363@gmail.com</a></p>
              </div>    
              <div className="col-md-6 mb-4">
                <h4>Phone</h4>
                <p>Call us at: <strong>+91 9947462273</strong></p>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-dark text-white text-center py-3">
          <p>&copy; 2024 Insurance Agent Management System. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}
