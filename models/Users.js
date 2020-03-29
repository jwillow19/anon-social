const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Specify name']
    },
    email: {
      type: String,
      required: [true, 'Specify email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Specify password']
    },
    avatar: {
      type: String
    },
    createdAt: { type: Date }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
