import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Change_Password extends PureComponent {
  handleFormSubmit({ password }) {
    var token = this.props.match.params.token;
    this.props.changepassword({ password, token });
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <p className="text-justify">
            {this.props.errorMessage}
          </p>
        </div>
      );
    }
  }

  renderField = ({ input, label, type, meta: { touched, error }, }) => (
    <div>
      <input className="form-control" {...input} placeholder={label} type={type} />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  );

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="login-form">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h2 className="text-center">Change Password</h2>
          {this.renderError()}
          <div className="form-group">
            <Field
              name="password"
              label="Password"
              component={this.renderField}
              type="password"
            />
          </div>
          <div className="form-group">
            <Field
              name="passwordConfirmation"
              label="Password Confirmation"
              component={this.renderField}
              type="password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.email = 'Please enter an password';
  }

  if (!values.passwordConfirmation) {
    errors.email = 'Please enter an password confirmation';
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Password must match';
  }

  return errors;
};

const mapStateToProps = state => ({ errorMessage: state.auth.Change_Password });

export default reduxForm({
  form: 'Change_Password',
  validate,
})(connect(mapStateToProps, actions)(Change_Password));
