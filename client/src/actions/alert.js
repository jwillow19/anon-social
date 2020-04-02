import { SET_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

// Action: setAlert dispatch type: SET_ALERT to alert reducer
export const setAlert = (msg, alertType) => dispatch => {
  // generate unique alert id with uuid.v4
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
};
