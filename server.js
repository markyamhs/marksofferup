const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const router = require('./routes/api');

const app = express();
app.use(cors());
connectDB();

app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

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
