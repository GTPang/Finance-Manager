const express = require('express');
const db = require('../config/db');
const authenticateUser = require('../middlewares/authMiddleware');

const router = express.Router();