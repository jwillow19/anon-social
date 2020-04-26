const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  // chat has channel lists, each channel is a list of msg object

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  channel: {
    type: String,
  },
  msg: {
    type: String,
  },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
