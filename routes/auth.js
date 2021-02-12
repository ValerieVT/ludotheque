const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../pool');
const admin = require('./admin');

const privateKey = process.env.JWT_SECRET;
const router = express.Router();

router.use('/admin', admin);

const checkRequiredAuthFields = (req, res, next) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(422).json({
      error: 'Merci de renseigner les 2 champs obligatoires.',
    });
  }
  return next();
};

router.post('/login', checkRequiredAuthFields, (req, res) => {
  const { identifier, password } = req.body;
  const sql = 'SELECT id, identifier, password hash FROM admin WHERE BINARY identifier = BINARY ?';
  pool.query(sql, [identifier], (err2, arrayOfAdmin) => {
    if (err2) {
      return res.status(500).json({
        error: err2.message,
      });
    }
    if (arrayOfAdmin.length === 0) {
      return res.status(401).json({
        error: 'Qui es-tu ? Essaie encore !',
      });
    }
    const admin = arrayOfAdmin[0];

    return bcrypt.compare(password, admin.hash, (errBcrypt, passwordsMatch) => {
      if (errBcrypt) {
        return res.status(500).json({ error: 'Carte événement : "Impossible de te connecter !"' });
      }
      if (!passwordsMatch) {
        return res.status(401).json({
          error: 'Quelque chose cloche avec ton identifiant ou ton mot de passe',
        });
      }
      const options = {
        expiresIn: 1000 * 60 * 60 * 3,
      };
      return jwt.sign(
        { id: admin.id },
        privateKey,
        options,
        (errToken, token) => {
          if (errToken) {
            return res.status(500).json('Aïe... impossible de t’authentifier !');
          }
          res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 3,
          });
          return res.json({ id: admin.id });
        },
      );
    });
  });
});

router.post('/logout', async (req, res) => {
  try {
    res.clearCookie('token');
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
