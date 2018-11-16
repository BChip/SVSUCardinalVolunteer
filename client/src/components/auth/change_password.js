import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Change_Password extends PureComponent {
  handleFormSubmit({password}) {
    var token = this.props.match.params.token;
    this.props.changepassword({
      password, token
    });
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
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <Field
            name="password"
            label="Password"
            component={this.renderField}
            type="password"
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            name="passwordConfirmation"
            label="Password Confirmation"
            component={this.renderField}
            type="password"
          />
        </fieldset>
        {this.renderError()}
        <button type="submit" className="btn btn-primary" disabled={submitting}>Submit</button>
      </form>
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

const mapStateToProps = state => ({ errorMessage: state.auth.error });

export default reduxForm({
  form: 'Change_Password',
  validate,
})(connect(mapStateToProps, actions)(Change_Password));
