import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Forgot_Password extends PureComponent {
  handleFormSubmit(formProps) {
    this.props.forgotpassword(formProps);
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
            name="email"
            label="Email"
            component={this.renderField}
            type="text"
          />
        </fieldset>
        {this.renderError()}
        <button type="submit" className="btn btn-primary" disabled={submitting}>Send</button>

      </form>
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
  return errors;
};

const mapStateToProps = state => ({ errorMessage: state.auth.error });

export default reduxForm({
  form: 'signin',
  validate,
})(connect(mapStateToProps, actions)(Forgot_Password));