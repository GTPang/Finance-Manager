const express = require('express');
const db = require('./config/db');

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const transactionRoutes = require("./routes/transactions");

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
    console.log('Server running on port:' + PORT);
})