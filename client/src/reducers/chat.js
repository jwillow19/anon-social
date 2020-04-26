import { SEND_MSG, RECEIVE_MSG } from '../actions/types';

const initialState = {
  general: [
    { sentFrom: 'dev', msg: 'welcome to generals' },
    { sentFrom: 'dev', msg: 'every 60seconds a minute past' },
    { sentFrom: 'dev', msg: 'bob spelled backwards is bob' },
    { sentFrom: 'dev', msg: 'dog spelled backwards is god' },
  ],
  secrets: [
    { sentFrom: 'dev', msg: 'Share your secrets to your hearts content!' },
    {
      sentFrom: 'dev',
      msg: 'I tell my friends Im busy but I just wanted to stay at home',
    },
  ],
  questions: [
    {
      sentFrom: 'dev',
      msg: 'ask away, there is no such thing as stupid questions here',
    },
    {
      sentFrom: 'dev',
      msg:
        'You have a button which, when you press it, does something. What does yours do?',
    },
  ],
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
        [payload.channel]: payload,
      };

    default:
      return state;
  }
}
