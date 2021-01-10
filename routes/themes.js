const express = require('express');

const router = express.Router();

const pool = require('../pool');

router.get('/', (req, res) => {
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

router.get('/:name', (req, res) => {
  pool.query('SELECT * FROM theme WHERE name=?', [req.params.name], (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

router.post('/', (req, res) => {
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
    }
  });
});

module.exports = router;
