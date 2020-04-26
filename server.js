const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');

// [*] Conenct DB from config
connectDB();

// [*] Init Parser Middleware
// express.json - parses incoming requests with JSON payloads and is based on   body-parser.
app.use(express.json({ extended: false }));
// fixed CORS error
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', (req, res) => {
  res.send('API Running');
});

// Define routes - app.use(endpoint, router)
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/chat', require('./routes/api/chat'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server up and running at port ${PORT}.`);
});
