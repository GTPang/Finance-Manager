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
        const [row] = await db.query('SELECT * FROM categories WHERE account_id = ?', [id]);
        if (row.length === 0) {
            return res.status(404).json({ status: 404, error: "No categories found!" })
        }
        res.status(200).json({ status: 200, details: row })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: err })
    }
})

router.post('/create-category', authenticateUser, async (req, res) => {
    const { account_id, category_name } = req.body;

    if (!account_id || !category_name) {
        return res.status(404).json({ status: 404, error: "Missing values in required fields!" })
    }

    try {
        const response = await db.query(`INSERT INTO categories(account_id, name) VALUES(?, ?)`, [account_id, category_name]);
        if (response.affectedRows === 0) {
            return res.status(404).json({ status: 404, error: "Invalid Data Type" })
        }
        res.status(200).json({ status: 200, message: "Category created successfully" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: err })
    }
})

router.put('/update-category/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { account_id, category_name } = req.body;

    if (!id) {
        return res.status(404).json({ status: 404, error: "Invalid category id!" })
    }

    try {
        const response = await db.query('UPDATE categories SET name = ? WHERE id = ? AND account_id = ?', [category_name, id, account_id]);
        if (response.affectedRows === 0) {
            return res.status(404).json({ status: 404, error: "Invalid Data Type" })
        }
        res.status(200).json({ status: 200, message: "Category updated successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, error: err })
    }
})

router.delete('/delete-category/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { account_id } = req.body;

    if (!id) {
        return res.status(404).json({ status: 404, error: "Invalid category id!" })
    }
    if (!account_id) {
        return res.status(404).json({ status: 404, error: "Invalid account id!" })
    }

    try {
        const response = await db.query('DELETE FROM categories WHERE id = ? AND account_id = ?', [id, account_id])
        if (response.affectedRows) {
            return res.status(404).json({ status: 404, error: "Couldnt delete category!" })
        }
        res.status(200).json({ status: 200, message: "Successfully deleted category!" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: err })
    }
})

module.exports = router;