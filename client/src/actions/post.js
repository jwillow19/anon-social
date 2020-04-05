import { GET_POSTS, POST_ERR } from './types';
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
      type: POST_ERR,
      payload: {
        msg: exception.response.statusText,
        status: exception.response.status
      }
    });
  }
};
