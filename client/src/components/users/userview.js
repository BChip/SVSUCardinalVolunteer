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
        <div className="row profile">
          <div className="col-md-4 offset-4">

            {/* -- SIDEBAR USERPIC --> */}
            <div className="profile-userpic">
              <img src={this.props.userlistpost.picture} alt={this.props.userlistpost.name} className="img-responsive" />
            </div>
            {/* -- END SIDEBAR USERPIC --*/}
            {/* -- SIDEBAR USER TITLE --*/}
            <div className="profile-usertitle">
              <div className="profile-usertitle-name">
                { this.props.userlistpost.name || '-' }
              </div>
              <div className="profile-usertitle-job">

                { this.props.userlistpost.svsurole || '-' }
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
