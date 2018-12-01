import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  LOGIN_PAGE_UNLOADED,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD,
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
    case FORGOT_PASSWORD:
      return { ...state, error: action.payload, authenticated: false };
    case CHANGE_PASSWORD:
      return { ...state, error: action.payload, authenticated: false };
    default:
      return state;
  }
};

export default authReducer;
