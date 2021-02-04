const express = require('express');

const router = express.Router();

const pool = require('../pool');

const urlApiThemes = '/api/themes/';

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

router.get('/:id', (req, res) => {
  pool.query('SELECT * FROM theme WHERE id=?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

router.get('/:id/jeux', (req, res) => {
  pool.query(`
  SELECT DISTINCT g.name, g.id, p.image, t.name AS selectionned_theme, t.id AS id_theme FROM game g
  RIGHT JOIN picture p ON p.game_id=g.id
  LEFT JOIN game_theme g_t 
  ON g.id=g_t.game_id 
  LEFT JOIN theme t
  ON g_t.theme_id=t.id
  WHERE p.type="int" AND t.id=? GROUP BY g.name`, [req.params.id], (err, results) => {
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
        const location = `http://${host}${urlApiThemes}${insertedTrack.id}`;
        return res
          .status(201)
          .set('Location', location)
          .json(insertedTrack);
      });
    }
  });
});

module.exports = router;
