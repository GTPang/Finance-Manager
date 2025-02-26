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
        const [row] = await db.query(`SELECT *, c.name AS category_name FROM transactions LEFT JOIN categories c ON c.id = transactions.category_id WHERE transactions.account_id = ?`, [id]);
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
    const { account_id, amount, type, category_id, description } = req.body;
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
        const response = await db.query(`INSERT INTO transactions(account_id, amount, type, category_id, description, date) VALUES(?, ?, ?, ?, ?, ?)`, [account_id, amount, type, category_id, description, date]);
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
    const { account_id, amount, type, category_id, description } = req.body;
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
        let query = 'UPDATE transactions SET ';
        let values = [];
        let setClauses = [];

        if (amount) {
            setClauses.push('amount = ?');
            values.push(amount);
        }

        if (type) {
            setClauses.push('type = ?');
            values.push(type);
        }

        if (category_id) {
            setClauses.push('category_id = ?');
            values.push(category_id);
        }

        if (description) {
            setClauses.push('description = ?');
            values.push(description);
        }

        if (date) {
            setClauses.push('date = ?');
            values.push(date);
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
        const [row] = await db.query('SELECT * FROM transactions WHERE id = ?', [id]);
        res.status(200).json({ status: 200, message: "Transation updated successfully", transaction: row[0] })
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


// Get Today & Yestday's Expense / Income for a user 
router.get('/gettodays:type/:id', authenticateUser, async (req, res) => {
    const { type, id } = req.params;
    if (!id) {
        return res.status(404).json({ status: 400, error: "Invalid user id!" })
    }
    try {
        const response = await db.query('CALL todayExpense(?, ?)', [id, type]);
        res.status(200).json({ status: 200, todaysExpense: response[0][0][0].today_expense, yesterdaysExpense: response[0][1][0].yesterday_expense })
    }
    catch (err) {
        res.status(500).json({ status: 500, error: err })
    }
})

// Get This Month's Expense / Income for a user 
router.get('/getthismonths:type/:id', authenticateUser, async (req, res) => {
    const { type, id } = req.params;
    if (!id) {
        return res.status(404).json({ status: 400, error: "Invalid user id!" })
    }
    try {
        const response = await db.query('CALL thisMonthExpense(?, ?)', [id, type]);
        res.status(200).json({ status: 200, thisMonthExpense: response[0][0][0].this_month_expense })
    }
    catch (err) {
        res.status(500).json({ status: 500, error: err })
    }
})


module.exports = router;