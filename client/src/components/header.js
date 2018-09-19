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
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <Link to="/" className="navbar-brand">Cardinal Volunteer</Link>

        <ul className="navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

export default connect(mapStateToProps)(Header);
