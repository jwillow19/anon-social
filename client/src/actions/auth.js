import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';
import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from '../utils/authToken';

// [*] Action - Register user to DB - function INPUT( obj{name, email, password} )
export const register = ({ name, email, password }) => async (dispatch) => {
  // Pepare header, json body content to be sent
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    // Successful post request - diaptch reigster_success
    const res = await axios.post(
      'http://localhost:5000/api/users',
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (exception) {
    // catch errors(array) from backend to dispatch alerts
    const errors = exception.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// [*] Action - Load user by checking if theres a token in header
export const loadUser = () => async (dispatch) => {
  // save token to header if theres a token in localStorage
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    // auth middleware from backend will validate token in header
    const res = await axios.get('http://localhost:5000/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (exception) {
    // this will run if token is invalid
    dispatch({
      type: AUTH_ERR,
    });
  }
};

// [*] Action - Login user to DB - function INPUT( obj{ email, password} )
export const login = ({ email, password }) => async (dispatch) => {
  // Pepare header, json body content to be sent
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    // Send post request to auth api - diaptch reigster_success
    const res = await axios.post(
      'http://localhost:5000/api/auth',
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (exception) {
    // catch errors(array) from backend to dispatch alerts
    const errors = exception.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// [*] Action - logout user
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
