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
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="../Postings">
Home
                {' '}
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/Postings">My Opportunities</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Postings">My Account</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Postcreate">Create Post</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Signout">Log Out</Link>
            </li>
          </ul>
        </div>
      </nav>

    );
  }
}

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

export default connect(mapStateToProps)(Header);
