import {
  GET_POSTS,
  POST_ERR,
  UPDATE_LIKES,
  DELETE_POST,
  CREATE_POST,
} from '../actions/types';

// [*] Steps to building Reducers

// [*] 1. Create initialState
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

// [*] Create reducer function(state, action)
//  action = obj{type, payload}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    // on GET_POST - return object with current state and update posts with payload
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case POST_ERR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        // 1. find the post with postId from posts array
        // 2. if post is found: udpate the likes array in post
        // 3. else leave post as is
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case CREATE_POST:
      return {
        ...state,
        // 1. add the new post to the current posts array
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        // 1. filter all post without deleted postId
        // 2. should return a new posts array without the deleted post
        posts: state.posts.filter((post) => post._id !== payload.postId),
        loading: false,
      };

    // [side] need default otherwise will return: "Reducer returned undefined during initialization"
    default:
      return state;
  }
}
