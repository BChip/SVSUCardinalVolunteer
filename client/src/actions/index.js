
import History from '../history';


import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_POSTINGS,
  DELETE_POSTINGS,
  LOGIN_PAGE_UNLOADED,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD,

} from './types';

const ROOT_URL = 'http://localhost:3030';

export const signinUser = ({ mail, password }) => async (dispatch) => {
  const headers = { authorization: `Basic ${btoa(`${mail.toLowerCase()}:${password}`)}`, 'content-type': 'application/json' };
  const response = await fetch(`${ROOT_URL}/auth`, { method: 'POST', headers });
  if (response.status !== 201) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid Email or Password. Please Try Again' });
    return;
  }
  dispatch({ type: AUTH_USER });
  const json = await response.json();
  const { token, user } = json;
  const {
    id, name, picture, email,
  } = user;
  localStorage.setItem('token', token);
  localStorage.setItem('id', id);
  localStorage.setItem('name', name);
  localStorage.setItem('picture', picture);
  localStorage.setItem('mail', email);
  History.push('/postings');
};

export const signupUser = formvalue => async (dispatch) => {
  const headers = { 'content-type': 'application/json' };
  const body = JSON.stringify(formvalue);
  const response = await fetch(`${ROOT_URL}/users`, { method: 'POST', headers, body });
  if (response.status !== 201) {
    dispatch({ type: AUTH_ERROR, payload: response.message });
    return;
  }
  History.push('../welcome');
};

export const forgotpassword = ( { email, link }) => async (dispatch) => {
  const headers = { 'content-type': 'application/json' };
  const body = JSON.stringify({email, link});
  const response = await fetch(`${ROOT_URL}/password-resets`, { method: 'POST', headers, body });
  if (response.status !== 202) {
    dispatch({ type: 
      FORGOT_PASSWORD, payload: response.message });
    return;
  }
  History.push('../welcome');
};

export const changepassword = ( { password, token }) => async (dispatch) => {
  const headers = { 'content-type': 'application/json' };
  const body = JSON.stringify({password});
  const response = await fetch(`${ROOT_URL}/password-resets/${token}`, { method: 'GET', headers });
  if (response.status === 200) {
    const _response = await fetch(`${ROOT_URL}/password-resets/${token}`, { method: 'PUT', headers, body });
    if (_response.status !== 200) {
      dispatch({ type: 
        CHANGE_PASSWORD, payload: _response.message });
      return;
    }
    History.push('../welcome');
  }
  else {
    dispatch({ type: 
      CHANGE_PASSWORD, payload: response.message });
    return;
  }
};

export const createPost = ({
  title, description, location, time, category,
}) => async (dispatch) => {
  const headers = { authorization: `Bearer ${localStorage.getItem('token')}`, 'content-type': 'application/json' };
  const body = JSON.stringify(
    {
      title, description, location, time, category,
    },
  );
  const response = await fetch(`${ROOT_URL}/postings`, { method: 'POST', headers, body });
 
  if (response.status !== 201) {
    dispatch({ type: AUTH_ERROR, payload: response.message });
    return;
  }
  History.push('/postings');
};

export const deletePost = postselectedid => async (dispatch) => {
  const headers = { authorization: `Bearer ${localStorage.getItem('token')}`, 'content-type': 'application/json' };
  const response = await fetch(`${ROOT_URL}/postings/${postselectedid}`, { method: 'DELETE', headers });
  if (response.status === 204) {
    dispatch({
      type: DELETE_POSTINGS,
      payload: postselectedid,
    });
    return;
  }

  History.push('/postings');
};

export const signoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('name');
  localStorage.removeItem('picture');
  localStorage.removeItem('mail');
  return { type: UNAUTH_USER };
};

export const fetchPostings = () => async (dispatch) => {
  const headers = { authorization: `Bearer ${localStorage.getItem('token')}` };
  const response = await fetch(`${ROOT_URL}/postings`, { method: 'GET', headers });
  const json = await response.json();
  dispatch({
    type: FETCH_POSTINGS,
    payload: json,
  });
};

export function unload() {
  return { type: LOGIN_PAGE_UNLOADED, payload: '' };
}
