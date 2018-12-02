import React from 'react';
import { Route } from 'react-router-dom';
import App from '../components/app';
import RequireAuth from '../components/auth/require_auth';
import Signin from '../components/auth/signin';
import Signout from '../components/auth/signout';
import Signup from '../components/auth/signup';
import Postings from '../components/posting/postings';
import Welcome from '../components/welcome';
import Forgot_Password from '../components/auth/forgot_password';
import Change_Password from '../components/auth/change_password';
import Postcreate from '../components/posting/postcreate';
import EditPost from '../components/posting/editposting';
import Userlist from '../components/users/userlist';
import Userview from '../components/users/userview';
import PreviewEventList from '../components/posting/previewlist';
import EditUser from '../components/users/edituser';
import EditVolunteer from '../components/users/editvolunteer';
import RequestEvent from '../components/posting/requestevent';
import Mypostings from '../components/posting/myposting';

const Routes = () => (
  <App>
    <Route exact path="/" component={Signin} />
    <Route exact path="/signin" component={Signin} />
    <Route exact path="/signout" component={Signout} />
    <Route exact path="/welcome" component={Welcome} />
    <Route exact path="/signup/:type" component={Signup} />
    <Route exact path="/postings" component={RequireAuth(Postings)} />
    <Route exact path="/forgot_password" component={Forgot_Password} />
    <Route exact path="/change_password/:token" component={Change_Password} />
    <Route exact path="/postcreate" component={RequireAuth(Postcreate)} />
    <Route exact path="/editpost/:id" component={RequireAuth(EditPost)} />
    <Route exact path="/userlist" component={RequireAuth(Userlist)} />

    <Route exact path="/edituser/:type/:id" component={RequireAuth(EditUser)} />
    <Route exact path="/editvolunteer/:type/:id" component={RequireAuth(EditVolunteer)} />
    <Route exact path="/myposting" component={RequireAuth(Mypostings)} />
    <Route exact path="/previewlist" component={RequireAuth(PreviewEventList)} />
    <Route exact path="/requestevent" component={RequireAuth(RequestEvent)} />
    <Route exact path="/userview/:id" component={RequireAuth(Userview)} />

  </App>
);

export default Routes;
