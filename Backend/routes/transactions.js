const express = require('express');
const db = require('../config/db');
const authenticateUser = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json({ status: 404, error: "Invalid user id!" })
    }

    try {
        const [row] = await db.query(`SELECT * FROM transactions WHERE account_id =?`, [id]);
        if (row.length === 0) {
            return res.status(404).json({ status: 404, error: "No transactions found!" })
        }
        res.status(200).json({ status: 200, transactions: row })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: err })
    }
});

router.post('/create-transaction', authenticateUser, async (req, res) => {
    const { account_id, amount, type, category, description } = req.body;
    let { date } = req.body;

    if (!account_id) {
        return res.status(404).json({ status: 404, error: "Invalid user id!" })
    }
    if (!date) {
        date = new Date();
    } else {
        date = new Date(date);
    }

    try {
        const response = await db.query(`INSERT INTO transactions(account_id, amount, type, category, description, date) VALUES(?, ?, ?, ?, ?, ?)`, [account_id, amount, type, category, description, date]);
        if (response.affectedRows === 0) {
            return res.status(404).json({ status: 404, error: "Invalid Data Type" })
        }
        res.status(200).json({ status: 200, message: "Transation created successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: err })
    }
});

router.put('/update-transaction/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { account_id, amount, type, category, description } = req.body;
    let { date } = req.body;

    if (!id) {
        return res.status(404).json({ status: 404, error: "Invalid transaction id!" })
    }
    if (!account_id) {
        return res.status(404).json({ status: 404, error: "Invalid account id!" })
    }
    if (date) {
        date = new Date(date);
    }

    try {
        const response = await db.query(`UPDATE transactions SET amount = ?, type = ?, category = ?, description = ?, date = ? WHERE id = ? AND account_id = ?`, [amount, type, category, description, date, id, account_id]);
        if (response.affectedRows === 0) {
            return res.status(404).json({ status: 404, error: "Invalid Data Type" })
        }
        const [row] = await db.query('SELECT * FROM transactions WHERE id = ?', [id]);
        res.status(200).json({ status: 200, message: "Transation created successfully", transaction: row[0] })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: err })
    }
});

router.delete('/delete-transaction/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { account_id } = req.body;
    if (!id) {
        return res.status(404).json({ status: 404, error: "Invalid transaction id!" })
    }
    if (!account_id) {
        return res.status(404).json({ status: 404, error: "Invalid account id!" })
    }
    try {
        const response = await db.query('DELETE FROM transactions WHERE id = ? AND account_id = ?', [id, account_id]);
        if (response.affectedRows === 0) {
            return res.status(404).json({ status: 404, error: "Transaction not found!" })
        }
        res.status(200).json({ status: 200, message: "Transaction deleted successfully!" })
    }
    catch (err) {
        res.status(500).json({ status: 500, error: err })
    }
});

module.exports = router;