const express = require('express');

const router = express.Router();

const pool = require('../pool');

const urlApiJeux = '/api/jeux/';

router.get('/', (req, res) => {
  pool.query('SELECT g.name, g.id, p.image FROM game g RIGHT JOIN picture p ON p.game_id=g.id WHERE p.type="int" GROUP BY g.name ORDER BY g.name', (err, results) => {
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
  let sql = 'SELECT g.name, g.id, p.image FROM game g RIGHT JOIN picture p ON p.game_id=g.id WHERE p.type="int"';
  const sqlValues = [];
  if (req.query.name) {
    const searchByName = `%${req.query.name}%`;
    sql += ' AND name LIKE ?';
    sqlValues.push(searchByName);
  }
  if (req.query.collaborative) {
    const researchByCoop = Number(req.query.collaborative);
    sql += ' AND collaborative = ?';
    sqlValues.push(researchByCoop);
  }
  if (req.query.asymetric) {
    const researchByAsymetric = Number(req.query.asymetric);
    sql += ' AND asymetric = ?';
    sqlValues.push(researchByAsymetric);
  }
  if (req.query.duration_min) {
    const researchByDuration = Number(req.query.duration_min);
    sql += ' AND duration_min_in_minuts >= ?';
    sqlValues.push(researchByDuration);
  }
  if (req.query.player_nbmin) {
    const researchByPlayerMin = Number(req.query.player_nbmin);
    sql += ' AND player_nbmin = ?';
    sqlValues.push(researchByPlayerMin);
  }
  if (req.query.player_nbmax) {
    const researchByPlayerMax = Number(req.query.player_nbmax);
    sql += ' AND player_nbmax = ?';
    sqlValues.push(researchByPlayerMax);
  }
  if (req.query.player_nb) {
    const researchByPlayer = Number(req.query.player_nb);
    sql += ' AND player_nbmin <= ? AND player_nbmax >= ?';
    sqlValues.push(researchByPlayer, researchByPlayer);
  }
  if (req.query.player_agemin) {
    const researchByAgeMin = Number(req.query.player_agemin);
    sql += ' AND player_agemin < ?';
    sqlValues.push(researchByAgeMin);
  }
  if (req.query.player_agemax) {
    const researchByAgeMax = Number(req.query.player_agemax);
    sql += ' AND player_agemax > ?';
    sqlValues.push(researchByAgeMax);
  }
  if (req.query.gamerule_difficulty) {
    const researchByGameRule = Number(req.query.gamerule_difficulty);
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
  sql += ' GROUP BY g.name';
  return pool.query(sql, sqlValues, (error, results) => {
    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Aucun jeu ne correspond à ta recherche !' });
    }
    return res.status(200).json(results);
  });
});

router.get('/random', (req, res) => {
  pool.query('SELECT DISTINCT g.id FROM game g LEFT JOIN picture p ON g.id = p.game_id WHERE p.type="int"', (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    const resultat = Math.ceil(Math.random() * Math.floor(results.length));
    return res.json(results[resultat]);
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
  const gameId = req.params.id;

  pool.query('SELECT * FROM game WHERE id=?', [gameId], (err, results) => {
    pool.query('SELECT image FROM picture WHERE game_id=?', [gameId], (err2, results2) => {
      if (err || err2) {
        return res.status(500).json({
          error: err.message,
        });
      }
      if (results2.length === 0) {
        return res.status(500).json({
          error: 'Ce jeu n\'existe pas... Retourne à la case départ !',
        });
      }
      const arrayOfResults2 = [results2];
      const allAboutTheGame = Object.assign(results[0], arrayOfResults2);
      return res.status(200).send(allAboutTheGame);
    });
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
    return pool.query('SELECT * FROM picture WHERE game_id=?', [req.params.id], (errPicture, resPicture) => {
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
