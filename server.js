const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const connection = require('./connection');

const app = express();

app.use(express.json());
