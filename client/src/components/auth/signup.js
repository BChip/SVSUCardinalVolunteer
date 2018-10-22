import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends PureComponent {
  /* Assign Role for Student */
  studentroles = ['Staff', 'Faculty', 'Student', 'Adminstrative/Professional', 'Alumini'];

  handleFormSubmit(formProps) {
    formProps.typedata = this.props.match.params.type;
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

  renderTextArea = ({
    input, label, meta: { touched, error },
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <textarea {...input} className="form-control" placeholder={label} rows="5" cols="30" />
        {touched && ((error && <span className="text-danger">{error}</span>))}
      </div>
    </div>
  );

  studentform() {
    const {
      handleSubmit, submitting, pristine, reset,
    } = this.props;

    return (
      <div className="register-form">

        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h2 className="text-center">Register</h2>
          {this.renderSignError()}
          <div className="form-group">
            <Field
              name="fullName"
              label="Full Name"
              component={this.renderField}
              type="text"
            />
          </div>
          <div className="form-group">
            <Field

              name="svsuId"
              label="SVSU ID"
              component={this.renderField}
              type="text"
            />
          </div>
          <div className="form-group">
            <div>
              <label htmlFor="roleatsvsu">Role At SVSU:</label>
              <div>
                <Field className="form-control" name="role" component="select">
                  <option value="0">Select a role</option>
                  {this.studentroles.map(
                    roles => <option value={roles} key={roles}>{roles}</option>)}
                </Field>
              </div>
            </div>
          </div>

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
          <div className="clearfix">
            <button type="submit" className="btn btn-primary btn-small student-link-button" disabled={submitting}>Sign Up</button>
            <button type="submit" className="btn btn-primary btn-small" disabled={pristine || submitting} onClick={reset}>Clear</button>
          </div>
        </form>
      </div>

    );
  }

  partnerform() {
    const {
      handleSubmit, submitting, pristine, reset,
    } = this.props;

    return (
      <div className="register-form">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h2 className="text-center">Register</h2>
          {this.renderSignError()}
          <div className="form-group">
            <Field
              name="fullName"
              label="Full Name"
              component={this.renderField}
              type="text"
            />
          </div>
          <div className="form-group">
            <Field
              name="role"
              label="Role"
              component={this.renderField}
              type="text"
            />
          </div>
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
          <div className="form-group">
            <Field
              name="aboutorg"
              label="About Organization"
              component={this.renderTextArea}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-small student-link-button" disabled={submitting}>Sign Up</button>
          <button type="submit" className="btn btn-primary btn-medium" disabled={pristine || submitting} onClick={reset}>Clear</button>

        </form>
      </div>

    );
  }

  renderSignError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <p className="text-justify">
            Sorry!
            {' '}
            {this.props.errorMessage}
          </p>
        </div>
      );
    }
  }

  render() {
    if (this.props.match.params.type === 'student') {
      return (this.studentform());
    }
    if (this.props.match.params.type === 'partner') {
      return (this.partnerform());
    }
    return (<div><p>file don't exist</p></div>);
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
    errors.password = 'Please enter an password';
  } else if (values && values.password.length < 7) {
    errors.password = 'Password must have length greater than or equal to 6';
  }
  if (!values.fullName) {
    errors.fullName = 'Please enter your full name';
  }

  if (!values.svsuId) {
    errors.svsuId = 'Please enter your SVSU ID';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Please enter an password confirmation';
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Password must match';
  }
  if (values.role === '0') {
    errors.role = 'Please Select one role';
  }
  if (!values.aboutorg) {
    errors.aboutorg = 'Please provide some information about organisation';
  }
  return errors;
};

const mapStateToProps = state => ({ errorMessage: state.auth.error });

export default reduxForm({
  form: 'signup',
  validate,
})(connect(mapStateToProps, actions)(Signup));
