import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

// Action: setAlert dispatch type: SET_ALERT to alert reducer
export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  // generate unique alert id with uuid.v4
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  // setTimeOut to cancel alert after ... sec
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      }),
    timeout
  );
};
