import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import postingsReducer from './postings';
import userReducer from './users';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  postings: postingsReducer,
  users: userReducer,
});

export default rootReducer;
