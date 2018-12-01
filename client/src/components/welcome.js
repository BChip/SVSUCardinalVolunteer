import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => (
  <div className="login-form">
    <form>

      <div className="form-group">
        <p>
        Your Account has sucessfully created.
        Thank you for the registration.

        </p>
      </div>
      <div className="form-group text-center">
        <Link to="./Signin" className="btn btn-success center">Log in</Link>

      </div>

    </form>

  </div>
);

export default Welcome;
