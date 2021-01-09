const express = require('express');
const dotenv = require('dotenv');
const connection = require('./connection');

const port = process.env.PORT || 3000;
const app = express();

dotenv.config();
app.use(express.json());

app.get('/api/ludotheque/', (req, res) => {
  connection.query('SELECT * FROM games', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, (err, res) => {
  if (err) {
    res.status(500).json({
      error: err.message,
    });
  } else {
    console.log(`Server is listening on port ${process.env.PORT}`);
  }
});
