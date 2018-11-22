import React from 'react';
import { Link } from 'react-router-dom';

const Logoheader = () => (

  <Link className="navbar-brand" to="/Postings" id="logoimage_header">
    <img src={`${window.location.origin}/cardinal_volunteer.jpg`} width="150" height="80" alt="svsulogo" />
  </Link>
);
export default Logoheader;
