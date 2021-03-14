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

router.get('/', checkIfAuth, async (req, res) => {
  res.sendStatus(200);
});

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

router.get('/jeux/search', async (req, res) => {
  try {
    const searchForName = `%${req.query.name}%`;
    const sql = 'SELECT * FROM game WHERE name LIKE ?';
    await pool.query(sql, searchForName);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
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
  })
});

module.exports = router;
