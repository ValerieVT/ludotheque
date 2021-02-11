const cookieParser = require('cookie-parser');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const api = require('./routes');

app.use(cors({
  origin: process.env.URL_FRONT,
  credentials: true,
  optionsSuccessStatus: 200,
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api', api);

module.exports = app;
