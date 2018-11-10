import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import Header from '../header';
import * as actions from '../../actions';

class Userlist extends PureComponent {
  componentWillMount() {
    this.props.fetchusers();
  }

  renderPostings() {
    console.log(this.props);
    return this.props.userlistpost.map(userlist => (
      <tr>
        <th scope="row">1</th>
        <td>{userlist.name}</td>
        <td>{userlist.mail}</td>
        <td>{userlist.svsuid}</td>
      </tr>
    ),
    );
  }

  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <div className="col-md-10 offset-1">
            <p className="userlist">Userlist</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">SVSU - ID</th>
                  <th scope="col">Role at SVSU</th>
                  <th scope="col">Email</th>
                  <th scope="col">SVSU - ID</th>
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
const mapStateToProps = state => ({ userlistpost: state.users.userlist });

export default connect(mapStateToProps, actions)(Userlist);
