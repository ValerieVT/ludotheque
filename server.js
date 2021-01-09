const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const pool = require('./pool');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.get('/api/jeux', (req, res) => {
  pool.query('SELECT * FROM game ORDER BY name ASC', (err, results) => {
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

app.get('/api/jeux/:id', (req, res) => {
  pool.query('SELECT * FROM game WHERE id=?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results[0]);
    }
  });
});

app.put('/api/jeux/:id', (req, res) => {
  pool.query(`
  UPDATE game SET ? 
  WHERE id=?
  `, [req.body, req.params.id], (err) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      return pool.query('SELECT * FROM game WHERE id = ?', req.params.id, (err2, results) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const modifiedTrack = results[0];
        const host = req.get('host');
        const location = `http://${host}${req.url}/${modifiedTrack.id}`;
        return res
          .status(201)
          .set('Location', location)
          .json(modifiedTrack);
      });
    }
  });
});

app.get('/api/themes', (req, res) => {
  pool.query('SELECT * FROM theme ORDER BY name ASC', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/themes/:name', (req, res) => {
  pool.query('SELECT * FROM theme WHERE name', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/themes', (req, res) => {
  pool.query('INSERT INTO theme (name) VALUES (?)', [req.body.name], (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      return pool.query('SELECT * FROM theme WHERE id = ?', results.insertId, (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const insertedTrack = records[0];
        const host = req.get('host');
        const location = `http://${host}${req.url}/${insertedTrack.id}`;
        return res
          .status(201)
          .set('Location', location)
          .json(insertedTrack);
      });
    };
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
