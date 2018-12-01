import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Header from '../header/header';
import * as actions from '../../actions';

class EditPost extends PureComponent {
  componentDidMount() {
    this.props.fetchPostings(this.props.match.params.id).then(() => {
      this.props.initialize(this.props.edituserlist);
    });
  }

  handleFormSubmit({
    title, description, location, time, category,
  }) {
    this.props.UpdatePosting({
      title, description, location, time, category, valid: true, visible: false,
    }, this.props.match.params.id);
  }

    renderField = ({
      input, label, type, meta: { touched, error },
    }) => (
      <div>
        <label className="control-label">{label}</label>
        <div>
          <input className="form-control" {...input} type={type} />
          {touched && error && <span className="text-danger">{error}</span>}
        </div>
      </div>
    );

    renderSelectField = ({
      input, label, meta: { touched, error }, children,
    }) => (
      <div>
        <label className="control-label">{label}</label>
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
        <label className="control-label">{label}</label>
        <div>
          <textarea {...input} className="form-control" rows="5" cols="30" />
          {touched && error && <span className="text-danger">{error}</span>}
        </div>
      </div>
    )

    renderSignError() {
      if (this.props.errorMessage || this.props.successMesage) {
        return (
          <div className="alert alert-danger">
            <p className="text-justify">

              {this.props.errorMessage || this.props.successMesage}
            </p>
          </div>
        );
      }
    }

    render() {
      const {
        handleSubmit, submitting,
      } = this.props;

      return (
        <div>
          <Header />
          <div className="row eventcreateform">
            <div className="col-md-6 offset-md-3 eventform">

              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <h3 className="text-center">Update Event</h3>

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

                    name="time"
                    label="Date"
                    component={this.renderField}
                    type="date"
                  />
                </div>
                <div className="form-group">
                  <Field
                    name="category"
                    label="Category"
                    component={this.renderField}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <Field
                    name="location"
                    label="Location"
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


                <div className="clearfix">
                  <button type="submit" className="btn btn-primary btn-small student-link-button" disabled={submitting}>Update</button>

                </div>
              </form>
            </div>
          </div>
        </div>

      );
    }
}
const validate = (values) => {
  const errors = {};
  const today = new Date();

  if (!values.title) {
    errors.title = 'Please enter title for Event';
  }

  if (!values.time) {
    errors.time = 'Please enter event Date';
  } else if (values && new Date(values.time) < today) {
    errors.time = 'You cannot create event in past';
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

const mapStateToProps = state => ({
  edituserlist: state.postings.singlePosting,
  initialValues: state.postings.singlePosting,
  errorMessage: state.auth.error,
  successMesage: state.postings.successPosting,

});
export default reduxForm({
  form: 'EditPost',
  enableReinitialize: true,
  validate,
  keepDirtyOnReinitialize: true,
})(connect(mapStateToProps, actions)(EditPost));
