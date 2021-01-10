const express = require('express');
const jeux = require('./jeux');
const themes = require('./themes');

const router = express.Router();

router.use('/jeux', jeux);
router.use('/themes', themes);

module.exports = router;
