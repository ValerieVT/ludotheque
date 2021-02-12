const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../pool');

const privateKey = process.env.JWT_SECRET;
const router = express.Router();

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

module.exports = router;