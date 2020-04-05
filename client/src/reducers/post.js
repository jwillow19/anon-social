import { GET_POSTS, POST_ERR } from '../actions/types';

// [*] Steps to building Reducers

// [*] 1. Create initialState
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

// [*] Create reducer function(state, action)
//  action = obj{type, payload}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    // on GET_POST - return object with current state and update posts with payload
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case POST_ERR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    // [side] need default otherwise will return: "Reducer returned undefined during initialization"
    default:
      return state;
  }
}
