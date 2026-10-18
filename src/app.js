const express = require('express');
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieParser())

/**
 * All Routes
 */

const authRouter = require('./routes/auth.routes')
const accountRouter = require('./routes/account.router')
const transactionRoutes = require("./routes/transaction.route")

/**
 * Use routes
 */

app.get("/", (req, res) => {
    res.send("LedgerCore Service is up and running")
})

app.use("/api/auth", authRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/transactions", transactionRoutes)



module.exports = app;