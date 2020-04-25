// App has multiple Reducers - combine with
import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import post from './post';
import chat from './chat';

export default combineReducers({
  alert,
  auth,
  post,
  chat,
});
