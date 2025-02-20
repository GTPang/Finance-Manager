const express = require('express');
const db = require('../config/db');
const authenticateUser = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json({ status: 404, error: "Invalid account id!" })
    }

    try {
        const [row] = await db.query('SELECT * FROM budgets WHERE account_id = ?', [id]);
        if (row.length === 0) {
            return res.status(404).json({ status: 404, error: "No budgets found!" })
        }
        res.status(200).json({ status: 200, budgets: row })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: err })
    }
})

router.post('/create-budget', authenticateUser, async (req, res) => {
    const { account_id, category_id, amount } = req.body;
    let { date_start, date_end } = req.body;

    if (date_start) {
        date_start = new Date(date_start).toISOString().split('T')[0];
    }
    if (date_end) {
        date_end = new Date(date_end).toISOString().split('T')[0];
    }

    if (!account_id || !category_id || !amount || !date_start || !date_end) {
        return res.status(404).json({ status: 404, error: "Missing values in required fields!" })
    }

    try {
        const response = await db.query(`INSERT INTO budgets(account_id, category_id, amount, date_start, date_end) VALUES(?, ?, ?, ?, ?)`, [account_id, category_id, amount, date_start, date_end]);
        if (response.affectedRows === 0) {
            return res.status(404).json({ status: 404, error: "Invalid Data Type" })
        }
        res.status(200).json({ status: 200, message: "Budget created successfully" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: err })
    }
})

router.put('/update-budget/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { account_id, category_id, amount, date_start, date_end } = req.body;

    if (!id) {
        return res.status(404).json({ status: 404, error: "Invalid budget id!" })
    }

    try {
        let values = []
        let query = 'UPDATE budgets SET ';
        let setClauses = [];

        if (category_id) {
            setClauses.push('category_id = ?')
            values.push(category_id);
        }

        if (amount) {
            setClauses.push('amount = ?');
            values.push(amount);
        }

        if (date_start) {
            setClauses.push('date_start = ?');
            values.push(date_start);
        }
        if (date_end) {
            setClauses.push('date_end = ?');
            values.push(date_end);
        }

        if (setClauses.length === 0) {
            return res.status(400).json({ status: 400, error: "No valid fields provided!" })
        }

        query = query + setClauses.join(', ') + ' WHERE id = ? AND account_id = ?';
        values.push(id, account_id);

        const response = await db.query(query, values);
        if (response.affectedRows === 0) {
            return res.status(404).json({ status: 404, error: "Invalid Data Type" })
        }
        res.status(200).json({ status: 200, message: "Budget updated successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, error: err })
    }
})

router.delete('/delete-budget/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { account_id } = req.body;

    if (!id) {
        return res.status(404).json({ status: 404, error: "Invalid budget id!" })
    }
    if (!account_id) {
        return res.status(404).json({ status: 404, error: "Invalid account id!" })
    }

    try {
        const response = await db.query('DELETE FROM budgets WHERE id = ? AND account_id = ?', [id, account_id])
        if (response.affectedRows) {
            return res.status(404).json({ status: 404, error: "Couldnt delete budget!" })
        }
        res.status(200).json({ status: 200, message: "Successfully deleted budget!" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: err })
    }
})

module.exports = router;