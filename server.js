const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const pool = require('./pool');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.get('/api/games', (req, res) => {
  pool.query('SELECT * FROM game', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/games/collaborative', (req, res) => {
  pool.query('SELECT * FROM game WHERE collaborative=1', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/games/asymetric', (req, res) => {
  pool.query('SELECT * FROM game WHERE asymetric=1', (err, results) => {
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
