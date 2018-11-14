import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  LOGIN_PAGE_UNLOADED,
} from '../actions/types';

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state, error: '', authenticated: true, userinformation: action.payload,
      };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:

      return { ...state, error: action.payload };
    case LOGIN_PAGE_UNLOADED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
