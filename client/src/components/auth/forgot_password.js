import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Forgot_Password extends PureComponent {
  handleFormSubmit({ email }) {
    var link = "http://localhost:3000/change_password/";
    this.props.forgotpassword({ email, link });
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
          <h2 className="text-center">Password Reset</h2>
          {this.renderError()}
          <div className="form-group">
            <Field
              name="email"
              label="Email"
              component={this.renderField}
              type="text"
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

  if (!values.email) {
    errors.email = 'Please enter an email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const mapStateToProps = state => ({ errorMessage: state.auth.Forgot_Password });

export default reduxForm({
  form: 'Forgot_Password',
  validate,
})(connect(mapStateToProps, actions)(Forgot_Password));
