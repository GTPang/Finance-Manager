const express = require('express');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const { username, password, email, firstname, lastname } = req.body;
    if (!username || !password || !email) {
        return res.status(404).json({ status: 404, error: "All fields are required!" })
    }

    const [searchUser] = await db.query(`SELECT * FROM users WHERE username = ? OR email = ?`, [username, email]);
    if (searchUser.length > 0) {
        return res.status(400).json({ status: 400, error: "User already exists!" })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const response = await db.query(`INSERT INTO users(username, password, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)`, [username, hashedPassword, email, firstname, lastname]);
        return res.status(200).json({ status: 200, message: "User created successfully!" })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ status: 500, error: err })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ status: 400, error: "All fields are required!" })
    }

    try {
        const [rows] = await db.query(`SELECT * FROM users WHERE username = ?`, [username]);
        if (rows.length === 0) {
            return res.status(404).json({ status: 404, error: "Invalid username!" })
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 401, error: "Invalid password!" })
        }

        const token = jwt.sign(
            { user_id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ status: 200, message: "Login Successful", token: token })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 500, error: err })
    }
})

module.exports = router;