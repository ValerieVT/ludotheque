const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const pool = require('./pool');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.get('/api/jeux', (req, res) => {
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

app.get('/api/jeux/rapides', (req, res) => {
  pool.query('SELECT * FROM game WHERE duration_min_in_minuts<16', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/jeux/longs', (req, res) => {
  pool.query('SELECT * FROM game WHERE duration_min_in_minuts>60', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/jeux/collaboratifs', (req, res) => {
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

app.get('/api/jeux/asymetriques', (req, res) => {
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

app.get('/api/jeux/culture-generale', (req, res) => {
  pool.query('SELECT * FROM game WHERE generalknowledge IS NOT NULL', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/jeux/chance', (req, res) => {
  pool.query('SELECT * FROM game WHERE chance IS NOT NULL', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/jeux/reflexion', (req, res) => {
  pool.query('SELECT * FROM game WHERE reflexion IS NOT NULL', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/jeux/adresse', (req, res) => {
  pool.query('SELECT * FROM game WHERE skill IS NOT NULL', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

app.put('/api/jeux/:id', (req, res) => {
  pool.query('UPDATE game SET ? WHERE id=?', [req.body, req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      pool.query('SELECT * FROM game WHERE id=?', req.params.id, (err2, results2) => {
        if (err2) {
          res.status(500).json({
            error: err.message,
          });
        } else {
          res.json(results2[0]);
        }
      });
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
