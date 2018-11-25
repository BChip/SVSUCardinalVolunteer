import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import * as actions from '../../actions';


class Userview extends PureComponent {
  componentWillMount() {
    if (this.props.match.params.id === localStorage.getItem('id')) { this.props.fetchusers('me'); } else {
      this.props.fetchusers(this.props.match.params.id);
    }
  }

  renderPostings() {
    return (
      <div className="card eventcard" key={this.props.userlistpost.id}>
        <img src={this.props.userlistpost.picture} alt={this.props.userlistpost.name} className="img-responsive" />
        <div className="card-body">
          <h5 className="card-title"><b>{this.props.userlistpost.name}</b></h5>
          <p className="card-text">{this.props.userlistpost.role}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>SVUSID:</b>
            {' '}
            {this.props.userlistpost.svsuid}
          </li>
          <li className="list-group-item">
            <b>Email:</b>
            {' '}
            {this.props.userlistpost.email}
          </li>

        </ul>
        <div className="card-body">
          <Link className="btn btn-link" to={`/edituser/${this.props.userlistpost.role}/${this.props.userlistpost.id}`}>Edit</Link>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.userlistpost) {
      return (
        <div>
          <Header />
          <div className="row">
            <div className="col-md-10 offset-1">
              <p className="eventlist">Profile</p>
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
        <div className="row">
          <div className="col-md-10 offset-1">
            <p className="eventlist">Profile</p>
            {this.renderPostings()}
          </div>
        </div>
      </div>


    );
  }
}

Userview.propTypes = {

  fetchusers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ userlistpost: state.users.singleuser });

export default connect(mapStateToProps, actions)(Userview);
