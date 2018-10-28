import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => (


  <div className="row text-center">
    <div className="col-sm-6 col-sm-offset-3">
      <br />
      <br />
      <h2>Success</h2>

      <p>
        Your Account has sucessfully created.
        Thank you for the registration.
        Please go to your above email now and login.
      </p>
      <Link to="./Signin" className="btn btn-success">Log in</Link>
      <br />
      <br />
    </div>
  </div>
);

export default Welcome;
