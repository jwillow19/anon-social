// [*] Alert Reducer - function INPUT (State, Action)
// Bring in action types
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// Alert State - array of object
const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  // evaluate action.type to do something...
  switch (type) {
    // return previous state with newly added alert
    case SET_ALERT:
      return [...state, payload];
    // Remove specific alert by id from state array
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    // default state
    default:
      return state;
  }
}
