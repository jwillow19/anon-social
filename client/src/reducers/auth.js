import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERR
} from '../actions/types';

const initialState = {
  // Grab JWT from local storage and save to state
  token: localStorage.getItem('token'),
  // set to true once authenticated
  isAuthenticated: null,
  // set to false once loaded
  loading: true,
  // set to user once authenticated
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      // On success - log user in, set token to JWT
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERR:
      // On failure -
      localStorage.removeItem('token');
      return {
        // spread state object and modify
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case USER_LOADED:
      // Valid token - log user in
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false
      };
    default:
      return state;
  }
}
