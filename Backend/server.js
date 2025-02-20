const express = require('express');
const cors = require("cors");
const db = require('./config/db');

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const transactionRoutes = require("./routes/transactions");
const budgetRoutes = require("./routes/budgets");
const categoryRoutes = require("./routes/categories");

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(PORT, () => {
    console.log('Server running on port:' + PORT);
})