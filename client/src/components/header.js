import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends PureComponent {
  renderLinks() {
    const { authenticated } = this.props;
    if (authenticated) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      );
    }
    return [
      <li className="nav-item" key="signin">
        <Link className="nav-link" to="/signin">Sign In</Link>
      </li>,
      <li className="nav-item" key="signup">
        <Link className="nav-link" to="/signup">Sign Up</Link>
      </li>,
    ];
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/Postings" id="logoimage_header">
          <img src={`${window.location.origin}/svsu.png`} width="150" height="80" alt="svsulogo" />
        </Link>
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
                  Volunteer Students
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Postings">
                  Volunteer Partners
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Postings">
                  Events
              </Link>
            </li>
          </ul>

          <ul className="nav navbar-nav ml-auto">
            <li>

              <Link className="nav-link" to="/Postings">
                <p>
                  <span className="glyphicon glyphicon-bell" />
                  Notification
                </p>

              </Link>
            </li>
            { /* PROFILE DROPDOWN - scrolling off the page to the right */ }
            <li className="nav-item dropdown">
              <Link to="/Postings" className="nav-link dropdown-toggle" id="navDropDownLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={localStorage.getItem('picture')} width="60" height="40" alt={localStorage.getItem('name')} />
              </Link>
              <div className="dropdown-menu" aria-labelledby="navDropDownLink">
                <Link className="dropdown-item" to="/Signout">{localStorage.getItem('name')}</Link>
                <div className="dropdown-divider" />
                <Link className="dropdown-item" to="/Signout">Edit Account</Link>
                <div className="dropdown-divider" />
                <Link className="dropdown-item" to="/Signout">Log Out</Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>

    );
  }
}

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

export default connect(mapStateToProps)(Header);
