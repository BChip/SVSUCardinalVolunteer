import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Header from '../header/header';
import * as actions from '../../actions';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter an email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.name) {
    errors.name = 'Please enter your full name';
  }

  if (!values.svsuid) {
    errors.svsuid = 'Please enter your SVSU ID';
  }


  if (!values.roleatsvsu) {
    errors.roleatsvsu = 'Please Select one role';
  }

  return errors;
};
const renderField = ({
  input, label, type, meta: { touched, error },
}) => (
  <div>
    <label htmlFor={label}>
      {label}

    </label>
    <div>
      <input className="form-control" {...input} placeholder={label} type={type} />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>

  </div>
);

const renderSelectField = ({
  input, label, meta: { touched, error }, children,
}) => (
  <div>
    <label>{label}</label>
    <div>
      <select {...input} className="form-control">
        {children}
      </select>
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);


class EditUser extends PureComponent {
  studentroles = ['Staff', 'Faculty', 'Student', 'Adminstrative/Professional', 'Alumini'];


  /* Assign Role for Student */


  handleFormSubmit(formProps) {
    debugger;
    console.log(formProps);
    this.props.updateProfile(formProps, this.props.match.params.id);
  }

  componentDidMount() {
    this.props.fetchusers('me').then(() => {
      this.props.initialize(this.props.edituserlist);
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  renderSignError() {
    if (this.props.errorMessage || this.props.success) {
      return (
        <div className="alert alert-danger">
          <p className="text-justify">
            {this.props.errorMessage || this.props.success}
          </p>
        </div>
      );
    }
  }


  render() {
    if (!this.props.edituserlist) { return null; }

    const {
      handleSubmit, submitting,
    } = this.props;


    if (this.props.match.params.type === 'user' || this.props.match.params.type === 'admin') {
      return (
        <div>
          <Header />
          <div className="register-form">

            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <h2 className="text-center">Edit Profile</h2>
              {this.renderSignError()}

              <div className="form-group">
                <Field
                  name="name"
                  label="Full Name"
                  component={renderField}
                  type="text"
                  onChange={event => this.handleChange(event)}
                />
              </div>
              <div className="form-group">
                <Field
                  name="svsuid"
                  label="SVSU ID"
                  component={renderField}
                  type="text"
                  onChange={event => this.handleChange(event)}
                />
              </div>
              <div className="form-group">
                <Field
                  name="roleatsvsu"
                  label="Role At SVSU"
                  type="text"
                  component={renderSelectField}
                  onChange={event => this.handleChange(event)}
                >
                  <option value="">Select one</option>
                  {this.studentroles.map(
                    roles => <option value={roles} key={roles}>{roles}</option>)}
                </Field>

              </div>

              <div className="form-group">
                <Field
                  name="email"
                  label="Email"
                  component={renderField}
                  type="text"
                  onChange={event => this.handleChange(event)}
                />
              </div>

              <div className="clearfix">
                <button type="submit" className="btn btn-primary btn-small student-link-button" disabled={submitting}>Update</button>

              </div>
            </form>
          </div>
        </div>

      );
    }
  }
}


EditUser.propTypes = {

  fetchusers: PropTypes.func.isRequired,
};
function mapStateToProps(state) {
  return {
    edituserlist: state.users.singleuser,
    initialValues: state.users.singleuser,
    errorMessage: state.auth.error,
    success: state.users.success,

  };
}

export default reduxForm({
  form: 'edituser',
  enableReinitialize: true,
  validate,
  keepDirtyOnReinitialize: true,
})(connect(mapStateToProps, actions)(EditUser));
