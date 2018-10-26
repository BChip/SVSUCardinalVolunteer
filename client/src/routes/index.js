import React from 'react';
import { Route } from 'react-router-dom';
import App from '../components/app';
import RequireAuth from '../components/auth/require_auth';
import Signin from '../components/auth/signin';
import Signout from '../components/auth/signout';
import Signup from '../components/auth/signup';
import Postings from '../components/postings';
import Welcome from '../components/welcome';
import Forgot_Password from '../components/auth/forgot_password';
import Change_Password from '../components/auth/change_password';

const Routes = () => (
  <App>
    <Route exact path="/" component={Welcome} />
    <Route exact path="/signin" component={Signin} />
    <Route exact path="/signout" component={Signout} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/postings" component={RequireAuth(Postings)} />
    <Route exact path="/forgot_password" component={Forgot_Password} />
    <Route exact path="/change_password" component={Change_Password} />
  </App>
);

export default Routes;
