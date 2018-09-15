import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends PureComponent {
  handleFormSubmit({ mail, password }) {
    this.props.signinUser({ mail, password });
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <string>
Oops!
            {' '}
            {this.props.errorMessage}
          </string>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field className="form-control" name="mail" component="input" type="text" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field className="form-control" name="password" component="input" type="password" />
        </fieldset>
        {this.renderError()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({ errorMessage: state.auth.error });

export default reduxForm({
  form: 'signin',
})(connect(mapStateToProps, actions)(Signin));
