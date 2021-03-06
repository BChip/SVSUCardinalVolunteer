import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import * as actions from '../../actions';

class Userlist extends PureComponent {
  componentWillMount() {
    this.props.fetchusers();
  }

  /*handleDelete(userselectedid) {
    this.props.deleteUser(userselectedid);
  } */

  renderPostings() {
    const visiblefilter = this.props.listinguser.filter(
      visibleuser => (visibleuser.id !== localStorage.getItem('id')),
    );
    return visiblefilter.map((userlist, index) => (
      <tr key={userlist.id}>
        <th scope="row">{index + 1}</th>
        <td>{userlist.name || '-'}</td>
        <td>{userlist.email || '-'}</td>
        <td>{userlist.svsuid || '-'}</td>
        <td>{userlist.role || '-'}</td>
        <td>
          {' '}

          <Link className="btn btn-link" to={`/userview/${userlist.id}`}>
            View

          </Link>
        </td>
      </tr>
    ),
    );
  }

  render() {
    if (!this.props.listinguser) {
      return (
        <div>
          <Header />

          <div className="row eventcreateform">
            <div className="col-md-10 offset-1">
              <p className="eventlist">User List</p>
              <div className="card eventcard">
                <h5 className="card-title text-center"><b>No Users</b></h5>
                <img src={`${window.location.origin}/nomorepost.jpg`} className="card-img-top" alt="nomorepost" />

              </div>
            </div>
          </div>

        </div>
      );
    }
    return (
      <div>
        <Header />
        <div className="row eventcreateform">
          <div className="col-md-10 offset-1">
            <p className="eventlist">User list</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">SVSU - ID</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>

                </tr>
              </thead>
              <tbody>
                {this.renderPostings()}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    );
  }
}

Userlist.propTypes = {

  fetchusers: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  listinguser: state.users.userlist,

});

export default connect(mapStateToProps, actions)(Userlist);
