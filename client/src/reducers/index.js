// App has multiple Reducers - combine with
import { combineReducers } from 'redux';
import alert from './alert';

export default combineReducers({
  alert
});
