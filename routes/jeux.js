const express = require('express');

const router = express.Router();

const pool = require('../pool');

const urlApiJeux = '/api/jeux/';

router.get('/', (req, res) => {
  pool.query('SELECT * FROM game ORDER BY id DESC', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.json(results);
    }
  });
});

router.get('/search', (req, res) => {
  let sql = 'SELECT * FROM game WHERE 1=1';
  const sqlValues = [];
  if (req.query.name) {
    const searchByName = `%${req.query.name}%`;
    sql += ' AND name LIKE ?';
    sqlValues.push(searchByName);
  }
  if (req.query.collaborative) {
    const researchByCoop = req.query.collaborative;
    sql += ' AND collaborative = ?';
    sqlValues.push(researchByCoop);
  }
  if (req.query.asymetric) {
    const researchByAsymetric = req.query.asymetric;
    sql += ' AND asymetric = ?';
    sqlValues.push(researchByAsymetric);
  }
  if (req.query.duration_min_in_min) {
    const researchByDuration = req.query.duration_min_in_min;
    sql += ' AND duration_min_in_min = ?';
    sqlValues.push(researchByDuration);
  }
  if (req.query.player_nbmin) {
    const researchByPlayerMin = req.query.player_nbmin;
    sql += ' AND player_nbmin = ?';
    sqlValues.push(researchByPlayerMin);
  }
  if (req.query.player_nbmax) {
    const researchByPlayerMax = req.query.player_nbmax;
    sql += ' AND player_nbmax = ?';
    sqlValues.push(researchByPlayerMax);
  }
  if (req.query.gamerule_difficulty) {
    const researchByGameRule = req.query.gamerule_difficulty;
    sql += ' AND gamerule_difficulty = ?';
    sqlValues.push(researchByGameRule);
  }
  if (req.query.generalknowledge) {
    const researchByGenKnowledge = req.query.generalknowledge;
    sql += ' AND generalknowledge = ?';
    sqlValues.push(researchByGenKnowledge);
  }
  if (req.query.chance) {
    const researchByChance = req.query.chance;
    sql += ' AND chance = ?';
    sqlValues.push(researchByChance);
  }
  if (req.query.reflection) {
    const researchByReflection = req.query.reflection;
    sql += ' AND reflection = ?';
    sqlValues.push(researchByReflection);
  }
  if (req.query.skill) {
    const researchBySkill = req.query.skill;
    sql += ' AND skill = ?';
    sqlValues.push(researchBySkill);
  }
  pool.query(sql, sqlValues, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else if (results.length === 0) {
      res.status(404).send('Aucun jeu ne correspond à ta recherche !');
    } else if (results.length === 1) {
      res.status(200).json(results[0]);
    } else {
      res.status(200).json(results);
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
    }
    return pool.query('SELECT * FROM game WHERE id = ?', req.params.id, (err2, results) => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql,
        });
      }
      const modifiedTrack = results[0];
      const host = req.get('host');
      const location = `http://${host}${urlApiJeux}${modifiedTrack.id}`;
      return res
        .status(201)
        .set('Location', location)
        .json(modifiedTrack);
    });
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
      const location = `http://${host}${urlApiJeux}${results.insertId}`;
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
      return res.status(500).json({
        error: err.message,
      });
    }
    return res.sendStatus(204);
  });
});

router.get('/:id/pictures', (req, res) => {
  pool.query('SELECT * FROM game WHERE id=?', [req.params.id], (errGame, resGame) => {
    if (errGame) {
      return res.status(500).json({
        error: errGame.message,
      });
    }
    if (resGame.length === 0) {
      return res.status(402).json({ error: 'Jeu non trouvé !' });
    }
    pool.query('SELECT * FROM picture WHERE game_id=?', [req.params.id], (errPicture, resPicture) => {
      if (errPicture) {
        return res.status(500).json({
          error: errPicture.message,
        });
      }
      if (resPicture.length === 0) {
        return res.status(402).json({
          error: 'Aucune image n est rattachée à ce jeu !',
        });
      }
      if (resPicture.length === 1) {
        return res.json(resPicture[0]);
      }
      return res.json(resPicture);
    });
  });
});

module.exports = router;
