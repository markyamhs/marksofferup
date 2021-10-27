const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const postController = require('./controllers/post');
const path = require('path')

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:3010',
  optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));
connectDB();

app.use(express.urlencoded({ extended: false }));

app.use('/api/post', postController);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log('listening on port 8080'));
