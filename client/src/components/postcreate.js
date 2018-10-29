import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Header from './header';
import * as actions from '../actions';

class Postcreate extends PureComponent {
  handleFormSubmit({
    title, description, location, time, category,
  }) {
    this.props.createPost({
      title, description, location, time, category,
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

    renderSelectField = ({
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
    )

    renderTextArea = ({
      input, label, meta: { touched, error },
    }) => (
      <div>
        <label>{label}</label>
        <div>
          <textarea {...input} className="form-control" placeholder={label} rows="5" cols="30" />
          {touched && error && <span className="text-danger">{error}</span>}
        </div>
      </div>
    )

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
      const {
        handleSubmit, submitting, pristine, reset,
      } = this.props;

      return (
        <div>
          <Header />
          <div className="register-form">

            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <h2 className="text-center">Create Event</h2>
              <p>* All fields are required to filled up.</p>
              {this.renderSignError()}
              <div className="form-group">
                <Field
                  name="title"
                  label="Title"
                  component={this.renderField}
                  type="text"
                />
              </div>
              <div className="form-group">
                <Field
                  name="description"
                  label="Description"
                  component={this.renderTextArea}
                />
              </div>
              <div className="form-group">
                <Field
                  name="location"
                  label="location"
                  component={this.renderField}
                  type="text"
                />
              </div>
              <div className="form-group">
                <Field

                  name="time"
                  label="Date"
                  component={this.renderField}
                  type="date"
                />
              </div>

              <div className="form-group">
                <Field
                  name="category"
                  label="category"
                  component={this.renderField}
                  type="text"
                />
              </div>


              <div className="clearfix">
                <button type="submit" className="btn btn-primary btn-small student-link-button" disabled={submitting}>Create</button>
                <button type="submit" className="btn btn-primary btn-small" disabled={pristine || submitting} onClick={reset}>Clear</button>
              </div>
            </form>
          </div>
        </div>

      );
    }
}
const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Please enter title for Event';
  }

  if (!values.time) {
    errors.time = 'Please enter event Date';
  }
  if (!values.location) {
    errors.location = 'Please enter the Venue';
  }
  if (!values.category) {
    errors.category = 'Please enter the category';
  }

  if (!values.description) {
    errors.description = 'Please provide some information about Event';
  }
  return errors;
};

const mapStateToProps = state => ({ errorMessage: state.auth.error });

export default reduxForm({
  form: 'PostCreate',
  validate,
})(connect(mapStateToProps, actions)(Postcreate));
