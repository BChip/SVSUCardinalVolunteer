import React from 'react';
import { Link } from 'react-router-dom';
import Userheader from './headeruser';

const renderUsertype = () => (
  <React.Fragment>
    <ul className="navbar-nav">
      { /* PROFILE DROPDOWN - scrolling off the page for opportunities */ }
      <li className="nav-item dropdown">
        <Link to="/Postings" className="nav-link dropdown-toggle" id="navDropDownLinkforopportunities" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  My Opportunities
        </Link>
        <div className="dropdown-menu" aria-labelledby="navDropDownLinkforopportunities">
          <Link className="dropdown-item" to="/Postings">View Opportunities</Link>
          <div className="dropdown-divider" />
          <Link className="dropdown-item" to="/Postcreate">Create Post</Link>
        </div>
      </li>
    </ul>

    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/Userlist">
                    Volunteers
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/previewlist">
                    Preview Events
        </Link>
      </li>
    </ul>
  </React.Fragment>
);

const rendervolunteer = () => (

  <ul className="navbar-nav">
    { /* PROFILE DROPDOWN - scrolling off the page for opportunities */ }
    <li className="nav-item ">
      <Link to="/Postings" className="nav-link " aria-haspopup="true" aria-expanded="false">
                  My Opportunities
      </Link>

    </li>
  </ul>

);

const renderpartner = () => (
  <React.Fragment>
    <ul className="navbar-nav">
      { /* PROFILE DROPDOWN - scrolling off the page for opportunities */ }
      <li className="nav-item dropdown">
        <Link to="/Postings" className="nav-link dropdown-toggle" id="navDropDownLinkforopportunities" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  My Opportunities
        </Link>
        <div className="dropdown-menu" aria-labelledby="navDropDownLinkforopportunities">
          <Link className="dropdown-item" to="/Postings">View Opportunities</Link>
          <div className="dropdown-divider" />
          <Link className="dropdown-item" to="/Postcreate">Create Post</Link>
        </div>
      </li>
    </ul>
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/Userlist">
                    Volunteers
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/previewlist">
                    Preview Events
        </Link>
      </li>
    </ul>

  </React.Fragment>
);


const Navheader = () => (
  <React.Fragment>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link" to="/Postings">
                  Home
            <span className="sr-only">(current)</span>
          </Link>
        </li>
      </ul>

      {localStorage.getItem('role') === 'admin' && renderUsertype()}
      {localStorage.getItem('role') === 'user' && rendervolunteer()}
      {localStorage.getItem('role') === 'community partner' && renderpartner()}
      <Userheader />
    </div>
  </React.Fragment>
);

export default Navheader;
