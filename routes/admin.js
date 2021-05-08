const express = require('express');
const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const renamePictureFile = require('./middlewares/rename-picture-file');
const pool = require('../pool');

const privateKey = process.env.JWT_SECRET;
const router = express.Router();

// const storage = multer.diskStorage({});

// const upload = multer({
//   storage,
// });

const checkIfAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token || token.length === 0) {
    return res.status(401).json({
      error: 'Tu n\'as pas la bonne carte pour accéder à cette page !',
    });
  }
  try {
    await jwt.verify(token, privateKey);
    return next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

router.post('/themes/:name', async (req, res) => {
  try {
    pool.query('INSERT INTO theme (name) VALUES(?)', [req.params.name], (error, results) => {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          return res.status(403).json({
            error: 'Ce thème existe déjà !',
          });
        }
        return res.status(500).json({
          error: error.message,
        });
      }
      return res.status(201).send('Thème ajouté !');
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.post('/jeux', (req, res) => {
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

// router.post('/photos', checkIfAuth, async (req, res) => {
//   try {
//     upload();
//     res.sendStatus(200);
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// });

router.put('/jeux/:id', (req, res) => {
  pool.query(`
  UPDATE game SET ? 
  WHERE id=?
  `, [req.body, req.params.id], (err) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    }
    return res.sendStatus(201);
  });
});

router.get('/jeux/search', (req, res) => {
  const searchForName = `%${req.query.name}%`;
  const sql = 'SELECT name, id FROM game WHERE name LIKE ?';
  return pool.query(sql, searchForName, (error, results) => {
    if (error) {
      if (results.length === 0) {
        return res.status(404).json({ error: 'Aucun jeu ne correspond à ta recherche !' });
      }
      return res.status(500).json({
        error: error.message,
      });
    }
    return res.json(results);
  });
});

router.get('/jeux/sans-photo', (req, res) => {
  pool.query(`
    SELECT g.name, g.id 
    FROM game g 
    WHERE NOT EXISTS 
    (SELECT * FROM picture p WHERE p.type="int" AND p.game_id=g.id)
    ORDER BY g.name`, (error, results) => {
    if (error) {
      res.status(500).json({
        error: error.message,
      });
    } else {
      res.json(results);
    }
  });
});

router.get('/', checkIfAuth, async (req, res) => {
  res.sendStatus(200);
});

router.get('/jeux/:id', (req, res) => {
  const gameId = req.params.id;

  pool.query('SELECT * FROM game WHERE id=?', [gameId], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    if (results.length === 0) {
      return res.status(500).json({
        error: 'Ce jeu n\'existe pas... Retourne à la case départ !',
      });
    }
    return res.status(200).send(results[0]);
  });
});

module.exports = router;
