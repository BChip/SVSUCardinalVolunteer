import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../../actions';

class Signout extends PureComponent {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (<Redirect to="/" />);
  }
}

export default connect(null, actions)(Signout);
