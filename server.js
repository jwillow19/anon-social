const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();
// [*] Conenct DB from config
connectDB();

// [*] Init Parser Middleware
// express.json - parses incoming requests with JSON payloads and is based on   body-parser.
app.use(express.json({ extended: false }));

// fixed CORS error
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors());

// app.get('/', (req, res) => {
//   res.send('API Running');
// });

// Define routes - app.use(endpoint, router)
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/chat', require('./routes/api/chat'));

// Serve static asset to production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));
  // load index from build
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server up and running at port ${PORT}.`);
});
