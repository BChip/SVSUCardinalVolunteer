import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends PureComponent {
  
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderField = ({
    input, label, type, meta: { touched, error },
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <input className="form-control" {...input} placeholder={label} type={type} />
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  );

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
    const { handleSubmit, submitting } = this.props;
    

    return (
      <div className="register-form">
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="form-group">
          <Field
            name="email"
            label="Email"
            component={this.renderField}
            type="text"
          />
        </div>
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
        {this.renderError()}
        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>Sign Up</button>

      </form>
    </div>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter an email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

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

const mapStateToProps = state => ({ errorMessage: state.auth.error });

export default reduxForm({
  form: 'signin',
  validate,
})(connect(mapStateToProps, actions)(Signup));
