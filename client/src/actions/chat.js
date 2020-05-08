import {
  SEND_MSG,
  RECEIVE_MSG,
  POST_ERR,
  // FETCH_MSG_SUCCESS,
  // FETCH_MSG_SUCCESS,
} from './types';
import axios from 'axios';

// @action  fetch chat msg
// export const fetchMsg = async (dispatch) => {
//   try {
//     // find all chat sorted by most recent
//     const chats = await Chat.find({ channel: req.params.channel })
//       .sort({ date: 'asc' })
//       .select('name user msg channel date');
//     const res = JSON.stringify(chats);
//     dispatch({
//       type: FETCH_MSG_SUCCESS,
//       payload: res,
//     });
//   } catch (exception) {
//     dispatch({
//       type: FETCH_MSG_SUCCESS,
//       payload: exception,
//     });
//     console.error(exception.message);
//     res.status(500).send('Server error');
//   }
// };

// [*] Action - Send message (require channel id)
export const sendMsg = (formData) => async (dispatch) => {
  // need header to send something
  // const config = {
  //   header: {
  //     'Content-Type': 'application/json'
  //   }
  // };

  try {
    const res = await axios.post(`http://localhost:5000/api/chat/`, formData);

    dispatch({
      type: SEND_MSG,
      // send postId of deleted post to reducer -> use id in payload to filter state.posts
      payload: res.data,
    });

    // dispatch(setAlert('Post created', 'success'));
  } catch (exception) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: exception.response,
        status: exception.response.status,
      },
    });
  }
};

// [*] Action - Get chats, use axios to hit post api endpoint to get chats in channel from DB
export const getMsg = (channel) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/chat/channel`,
      channel
    );

    console.log(res.data);
    dispatch({
      type: RECEIVE_MSG,
      payload: res.data,
    });
  } catch (exception) {
    dispatch({
      type: POST_ERR,
    });
  }
};
