import axios from 'axios';

// function adds x-auth-token to the global header then every request made by will have token and user will be authenticated
const setAuthToken = (token) => {
  // Goal: use this grab token from localStorage from REGISTER_SUCCESS and save to header
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
export default setAuthToken;
