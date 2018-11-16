import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class Signin extends PureComponent {
  handleFormSubmit({ mail, password }) {
    this.props.signinUser({ mail, password });
  }

  componentWillUnmount() {
    this.props.unload();
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <p className="text-justify">
            { this.props.errorMessage }
          </p>
        </div>
      );
    }
  }

  renderField = ({
    input, label, type, meta: { touched, error },
  }) => (


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
          <h2 className="text-center">Log in</h2>
          {this.renderError()}
          <div className="form-group">
            <Field
              name="mail"
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
            <button type="submit" className="btn btn-primary btn-block">Log in</button>
            <p class="text-center">
            <Link to="./forgot_password/"><u>
              Forgot Password</u>
            </Link></p>
          </div>
          <div className="clearfix">
            <p className="text-center"> Not Member? Join As</p>
            <hr />
            <Link to="./Signup/student" className="btn btn-primary btn-small student-link-button" role="button">
              Volunteer
            </Link>

            <Link to="./Signup/partner" className="btn btn-primary btn-small" role="button">
              Community Partner
            </Link>
          </div>
        </form>

      </div>

    );
  }
}
const validate = (values) => {
  const errors = {};

  if (!values.mail) {
    errors.mail = 'Please enter an email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)) {
    errors.mail = 'Invalid email address format';
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  } else if (values && values.password.length < 6) {
    errors.password = 'Password must be at least 6 character long';
  }
  return errors;
};

const mapStateToProps = state => ({ errorMessage: state.auth.error });

export default reduxForm({
  form: 'signin',
  validate,
})(connect(mapStateToProps, actions)(Signin));
