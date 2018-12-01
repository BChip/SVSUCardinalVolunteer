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
    errors.name = 'Please enter name of organization';
  }

  if (!values.aboutorg) {
    errors.aboutorg = 'Please enter description of organization';
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


const renderTextArea = ({
  input, label, meta: { touched, error },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input} className="form-control" placeholder={label} rows="5" cols="30" />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);


class EditVolunteer extends PureComponent {
  studentroles = ['Staff', 'Faculty', 'Student', 'Adminstrative/Professional', 'Alumini'];


  /* Assign Role for Student */


  handleFormSubmit(formProps) {
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

    return (
      <div>
        <Header />
        <div className="register-form">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <h2 className="text-center">Organization Profile</h2>
            {this.renderSignError()}
            <div className="form-group">
              <Field
              name="name"
              label="Organization Name"
              component={renderField}
              type="text"
            />
            </div>

            <div className="form-group">
              <Field
              name="email"
              label="Email"
              component={renderField}
              type="text"
            />
            </div>

            <div className="form-group">
              <Field
              name="aboutorg"
              label="About Organization"
              component={renderTextArea}
            />
            </div>

            <button type="submit" className="btn btn-primary btn-small student-link-button" disabled={submitting}>Update</button>


          </form>
        </div>
      </div>

    );
  }
}


EditVolunteer.propTypes = {

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
  form: 'editvolunteer',
  enableReinitialize: true,
  validate,
  keepDirtyOnReinitialize: true,
})(connect(mapStateToProps, actions)(EditVolunteer));
