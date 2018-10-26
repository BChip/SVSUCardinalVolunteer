import History from '../history';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_POSTINGS,
} from './types';

const ROOT_URL = 'http://127.0.0.1:9000';

export const authError = error => ({
  type: AUTH_ERROR,
  payload: error,
});

export const signinUser = ({ mail, password }) => async (dispatch) => {
  const headers = { authorization: `Basic ${btoa(`${mail}:${password}`)}`, 'content-type': 'application/json' };
  const response = await fetch(`${ROOT_URL}/auth`, { method: 'POST', headers });
  if (response.status !== 201) {
    dispatch(authError('Bad Login Info'));
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

export const signupUser = ({ email, password }) => async (dispatch) => {
  const headers = { 'content-type': 'application/json' };
  const body = JSON.stringify({ email, password });
  const response = await fetch(`${ROOT_URL}/users`, { method: 'POST', headers, body });
  const json = await response.json();
  if (response.status !== 201) {
    dispatch(authError(json.message));
    return;
  }
  History.push('/signin');
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
