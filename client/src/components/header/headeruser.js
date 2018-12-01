import React from 'react';
import { Link } from 'react-router-dom';

const Userheader = () => (

  <ul className="nav navbar-nav ml-auto">

    { /* PROFILE DROPDOWN - scrolling off the page to the right */ }
    <li className="nav-item dropdown">
      <Link to="/Postings" className="nav-link dropdown-toggle" id="navDropDownLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src={localStorage.getItem('picture')} width="60" height="40" alt={localStorage.getItem('name')} className="imgresponsive" />
      </Link>
      <div className="dropdown-menu" aria-labelledby="navDropDownLink">
        <Link className="dropdown-item" to={`/userview/${localStorage.getItem('id')}`}>{localStorage.getItem('name')}</Link>

        <div className="dropdown-divider" />
        <Link className="dropdown-item" to="/Signout">Log Out</Link>
      </div>
    </li>
  </ul>

);
export default Userheader;
