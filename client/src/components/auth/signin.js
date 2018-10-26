import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class Signin extends PureComponent {
  handleFormSubmit({ mail, password }) {
    this.props.signinUser({ mail, password });
  }

  renderError() {
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
    const { handleSubmit } = this.props;

    return (
      <div className="login-form">


        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h2 className="text-center">Log in</h2>
          {this.renderError()}
          <div className="form-group">
            <Field component="input" name="mail" type="text" className="form-control" placeholder="Username" />
          </div>
          <div className="form-group">
            <Field component="input" name="password" type="password" className="form-control" placeholder="Password" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">Log in</button>
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


const mapStateToProps = state => ({ errorMessage: state.auth.error });

export default reduxForm({
  form: 'signin',
})(connect(mapStateToProps, actions)(Signin));
