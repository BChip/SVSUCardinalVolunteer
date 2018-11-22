import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../header/header';
import * as actions from '../../actions';

class Userview extends PureComponent {
  componentWillMount() {
    this.props.fetchusers(this.props.match.params.id);
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
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                  <img src={this.props.userlistpost.picture} alt={this.props.userlistpost.name} />
                </div>
              </div>
              <div className="col-md-8">
                <div className="profile-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{ this.props.userlistpost.name || '-' }</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{ this.props.userlistpost.email || '-' }</p>
                    </div>
                  </div>

                </div>

              </div>
            </div>
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
