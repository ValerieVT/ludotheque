const express = require('express');
const auth = require('./auth');
const jeux = require('./jeux');
const themes = require('./themes');

const router = express.Router();

router.use('/auth', auth);
router.use('/jeux', jeux);
router.use('/themes', themes);

module.exports = router;
