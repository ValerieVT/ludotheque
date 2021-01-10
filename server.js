const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const jeux = require('./routes/jeux');
const themes = require('./routes/themes');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use('/api/jeux', jeux);

app.use('/api/themes', themes);

app.listen(port, (err, res) => {
  if (err) {
    res.status(500).json({
      error: err.message,
    });
  } else {
    console.log(`Server is listening on port ${process.env.PORT}`);
  }
});
