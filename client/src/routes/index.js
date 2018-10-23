import React from 'react';
import { Route } from 'react-router-dom';
import App from '../components/app';
import RequireAuth from '../components/auth/require_auth';
import Signin from '../components/auth/signin';
import Signout from '../components/auth/signout';
import Signup from '../components/auth/signup';
import Postings from '../components/postings';
import Welcome from '../components/welcome';


const Routes = () => (
  <App>
    <Route exact path="/" component={Signin} />
    <Route exact path="/signin" component={Signin} />
    <Route exact path="/signout" component={Signout} />
    <Route exact path="/welcome" component={RequireAuth(Welcome)} />
    <Route exact path="/signup/:type" component={Signup} />
    <Route exact path="/postings" component={Postings} />
  </App>
);

export default Routes;
