
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
  FETCH_USERS,
  FETCH_SINGLE_USER,
  FETCH_FAILURE_POSTING,
  DELETE_USERS,
  FETCH_FAILURE_USER,
  FETCH_SINGLE_POSTING,
  UPDATE_USERS,
  UPDATE_POSTING,

} from './types';

const ROOT_URL = ' http://developerradio.com:3030'; // 'http://developerradio.com:3030';

export const signinUser = ({ mail, password }) => async (dispatch) => {
  const headers = { authorization: `Basic ${btoa(`${mail.toLowerCase()}:${password}`)}`, 'content-type': 'application/json' };
  const response = await fetch(`${ROOT_URL}/auth`, { method: 'POST', headers });
  if (response.status !== 201) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid User. Please Try Again!' });
    return;
  }

  dispatch({ type: AUTH_USER });

  const json = await response.json();
  const { token, user } = json;
  const {
    id, name, picture, email, role,
  } = user;
  localStorage.setItem('token', token);
  localStorage.setItem('id', id);
  localStorage.setItem('role', role);
  localStorage.setItem('name', name);
  localStorage.setItem('picture', picture);
  localStorage.setItem('mail', email);
  History.push('/postings');
};

export const signupUser = formvalue => async (dispatch) => {
  if (!formvalue.svsuid && formvalue.typedata === 'partner') {
    formvalue.role = 'community partner';
  }
  const headers = { 'content-type': 'application/json' };
  const body = JSON.stringify(formvalue);
  const response = await fetch(`${ROOT_URL}/users`, { method: 'POST', headers, body });

  if (response.status !== 201) {
    if (response.status === 409) {
      dispatch({ type: AUTH_ERROR, payload: 'Email Address is Already Registered' });
      return;
    }
  }
  History.push('../welcome');
};

export const forgotpassword = ({ email, link }) => async (dispatch) => {
  const headers = { 'content-type': 'application/json' };
  const body = JSON.stringify({ email, link });
  const response = await fetch(`${ROOT_URL}/password-resets`, { method: 'POST', headers, body });
  if (response.status !== 202) {
    dispatch({ type: FORGOT_PASSWORD, payload: response.message });
    return;
  }
  History.push('../welcome');
};

export const changepassword = ({ password, token }) => async (dispatch) => {
  const headers = { 'content-type': 'application/json' };
  const body = JSON.stringify({ password });
  const response = await fetch(`${ROOT_URL}/password-resets/${token}`, { method: 'GET', headers });
  if (response.status !== 200) {
    dispatch({ type: CHANGE_PASSWORD, payload: response.message });
    return;
  }
  const _response = await fetch(`${ROOT_URL}/password-resets/${token}`, { method: 'PUT', headers, body });
  if (_response.status !== 200) {
    dispatch({ type: CHANGE_PASSWORD, payload: _response.message });
    return;
  }
  History.push('../welcome');
};

export const createPost = ({
  title, description, location, time, category, valid, visible,
}) => async (dispatch) => {
  const headers = { authorization: `Bearer ${localStorage.getItem('token')}`, 'content-type': 'application/json' };


  const body = JSON.stringify(
    {
      title, description, location, time, category, valid, visible,
    },
  );
  console.log(body);

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
  localStorage.removeItem('role');
  return { type: UNAUTH_USER };
};

export const fetchPostings = (postingid = '') => async (dispatch) => {
  const headers = { authorization: `Bearer ${localStorage.getItem('token')}` };

  try {
    const response = await fetch(`${ROOT_URL}/postings/${postingid}`, { method: 'GET', headers });

    const json = await response.json();
    if (postingid === '') {
      dispatch({
        type: FETCH_POSTINGS,
        payload: json,
      });
    } else {
      dispatch({
        type: FETCH_SINGLE_POSTING,
        payload: json,
      });
    }
  } catch (e) {
    dispatch({
      type: FETCH_FAILURE_POSTING,
      payload: e.response,
    });
  }
};

export function unload() {
  return { type: LOGIN_PAGE_UNLOADED, payload: '' };
}


export const fetchusers = (userid = '') => async (dispatch) => {
  const headers = { authorization: `Bearer ${localStorage.getItem('token')}` };

  try {
    const response = await fetch(`${ROOT_URL}/users/${userid}`, { method: 'GET', headers });
    const json = await response.json();
    if (userid === '') {
      dispatch({
        type: FETCH_USERS,
        payload: json,
      });
    } else {
      dispatch({
        type: FETCH_SINGLE_USER,
        success: '',
        payload: json,
      });
    }
  } catch (e) {
    dispatch({
      type: FETCH_FAILURE_USER,
      payload: e,
    });
  }
};


export const deleteUser = userselectedid => async (dispatch) => {
  const headers = { authorization: `Bearer ${localStorage.getItem('token')}`, 'content-type': 'application/json' };
  const response = await fetch(`${ROOT_URL}/users/${userselectedid}`, { method: 'DELETE', headers });
  if (response.status === 204) {
    dispatch({
      type: DELETE_USERS,
      payload: userselectedid,
    });
  }

  History.push('/userlist');
};

export const updateProfile = (updateformvalue, userid) => async (dispatch) => {
  const headers = { authorization: `Bearer ${localStorage.getItem('token')}`, 'content-type': 'application/json' };
  const body = JSON.stringify(updateformvalue);

  const response = await fetch(`${ROOT_URL}/users/${userid}`, { method: 'PUT', headers, body });

  const json = await response.json();
  if (response.status !== 200) {
    dispatch({ type: AUTH_ERROR, payload: json });
    return;
  }
  dispatch({ type: UPDATE_USERS, success: 'Your Profile has been updated Succesfully', payload: json });
};

export const UpdatePosting = (formvalue, postingid) => async (dispatch) => {
  const headers = { authorization: `Bearer ${localStorage.getItem('token')}`, 'content-type': 'application/json' };
  const body = JSON.stringify(formvalue);
  const response = await fetch(`${ROOT_URL}/postings/${postingid}`, { method: 'PUT', headers, body });

  const json = await response.json();
  if (response.status !== 200) {
    dispatch({ type: AUTH_ERROR, payload: json });
    return;
  }
  dispatch({ type: UPDATE_POSTING, success: 'Your Event has been updated Succesfully', payload: json });
};
