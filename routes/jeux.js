const express = require('express');

const router = express.Router();

const pool = require('../pool');

router.get('/', (req, res) => {
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

router.get('/rapides', (req, res) => {
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

router.get('/longs', (req, res) => {
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

router.get('/cooperatifs', (req, res) => {
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

router.get('/asymetriques', (req, res) => {
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

router.get('/culture-generale', (req, res) => {
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

router.get('/chance', (req, res) => {
  pool.query('SELECT * FROM game WHERE (chance=2 OR chance=3)', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

router.get('/reflexion', (req, res) => {
  pool.query('SELECT * FROM game WHERE (reflexion=2 OR reflexion=3)', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

router.get('/adresse', (req, res) => {
  pool.query('SELECT * FROM game WHERE (skill=2 OR skill=3)', (err, results) => {
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

router.put('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  pool.query('INSERT INTO game SET ?', [req.body], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    return pool.query('SELECT * FROM game WHERE id = ?', results.insertId, (err2, results2) => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql,
        });
      }
      const host = req.get('host');
      const location = `http://${host}/api/jeux/${results.insertId}`;
      return res
        .status(201)
        .set('Location', location)
        .json(results2);
    });
  });
});

router.delete('/:id', (req, res) => {
  pool.query('DELETE FROM game WHERE id=?', req.params.id, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.status(204);
    }
  });
});

module.exports = router;
