const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    // connect profile to user schema by ObjectID
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String
  },
  bio: {
    type: String
  },
  likes: {
    type: [String]
  }
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
