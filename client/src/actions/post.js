import {
  GET_POSTS,
  POST_ERR,
  UPDATE_LIKES,
  DELETE_POST,
  CREATE_POST
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

// [*] Action - Get Post, use axios to hit post api endpoint to get post from DB
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (exception) {
    dispatch({
      type: POST_ERR
      // payload: {
      //   msg: exception.response.statusText,
      //   status: exception.response.status
      // }
    });
  }
};

// [*] Action - Upvote post (require post id) by calling api/post/like/postid
export const upvotePost = postId => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/like/${postId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (exception) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: exception.response,
        status: exception.response.status
      }
    });
  }
};

// [*] Action - Downvote post (require post id) by calling api/post/unlike/postid
export const downvotePost = postId => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/unlike/${postId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (exception) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: exception.response,
        status: exception.response.status
      }
    });
  }
};

// [*] Action - Delete post (require post id) by calling api/posts/postid
export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/api/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      // send postId of deleted post to reducer -> use id in payload to filter state.posts
      payload: { postId }
    });

    dispatch(setAlert('Post removed', 'success'));
  } catch (exception) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: exception.response,
        status: exception.response.status
      }
    });
  }
};

// [*] Action - Create post (require post id) by calling api/posts/postid
export const createPost = formData => async dispatch => {
  // need header to send something
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`http://localhost:5000/api/posts`, formData);

    dispatch({
      type: CREATE_POST,
      // send postId of deleted post to reducer -> use id in payload to filter state.posts
      payload: res.data
    });

    dispatch(setAlert('Post created', 'success'));
  } catch (exception) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: exception.response,
        status: exception.response.status
      }
    });
  }
};
