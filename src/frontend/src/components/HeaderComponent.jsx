import React, { Component } from "react";
import { Link } from 'react-router-dom';
class HeaderComponent extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg" id="nav">
          <Link className="navbar-brand" to="/">
            EMS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-employees">
                  Create Employee
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employees-list">
                  List All Employees
                </Link>
              </li>
            
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default HeaderComponent;
