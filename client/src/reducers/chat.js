import { SEND_MSG, RECEIVE_MSG } from '../actions/types';

const initialState = {
  general: [
    { name: 'dev', msg: 'Welcome! Choose a channel on the left to start' },
  ],
  secrets: [],
  questions: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  //   const { topic, sentFrom, msg } = payload;

  switch (type) {
    case SEND_MSG:
      return {
        ...state,
        [payload.channel]: [
          ...state[payload.channel],
          { msg: payload.msg, sentFrom: payload.name },
        ],
      };
    //   return {
    //     ...state,
    //     // 1. use template literal to make a str to a key;
    //     // 2. spread topic list object by finding topic object with template literal from state
    //     // 3. append new msg object to end of list
    //     [topic]: [
    //       ...state[topic],
    //       {
    //         from,
    //         msg,
    //       },
    //     ],
    //   };
    case RECEIVE_MSG:
      return {
        ...state,
        // 1. use template literal to make a str to a key;
        // 2. spread topic list object by finding topic object with template literal from state
        // 3. append new msg object to end of list
        // [payload.topic]: [
        //   ...state[payload.topic],
        //   {
        //     sentFrom: payload.sentFrom,
        //     msg: payload.msg,
        //   },
        // ],
        [payload[0].channel]: payload,
      };

    default:
      return state;
  }
}
