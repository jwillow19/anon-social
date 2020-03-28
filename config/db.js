const mongoose = require('mongoose');
const config = require('config');
const dbConfig = config.get('mongoURI');

const connectDB = async () => {
  // try to await for mongoose conenct promise, if failure print message
  // and exit process with failure
  try {
    await mongoose.connect(dbConfig, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

// Export function
module.exports = connectDB;
