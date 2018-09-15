import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import postingsReducer from './postings';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  postings: postingsReducer,
});

export default rootReducer;
