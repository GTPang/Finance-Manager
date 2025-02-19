const express = require('express');
const db = require('../config/db');
const authenticateUser = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(403).json({ status: 403, error: "Invalid user id!" })
    }
    try {
        const [row] = await db.query(`SELECT * FROM users WHERE id = ?`, [id]);
        if (row.length < 0) {
            return res.status(404).json({ status: 404, error: "User not found!" })
        }
        return res.status(200).json({ status: 200, user: row[0] })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 500, error: "Internal server error!" })
    }
})

router.put('/user-update/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { email, firstname, lastname } = req.body;
    if (!id) {
        return res.status(403).json({ status: 403, error: "Invalid user id!" })
    }
    try {
        const response = await db.query(`UPDATE users SET email = ?, first_name = ?, last_name = ? WHERE id = ?`, [email, firstname, lastname, id])
        if (response.affectedRows === 0) {
            return res.status(404).json({ status: 403, error: "User not found!" })
        }
        return res.status(200).json({ status: 200, message: "User updated successfully!" })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = router;