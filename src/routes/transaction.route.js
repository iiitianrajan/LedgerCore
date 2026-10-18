const express = require('express')
const { authMiddleware,authSystemUserMiddleware } = require('../middleware/auth.middleware')
const transactionController = require('../controllers/transaction.controller')
const router = express.Router()

router.post("/",authMiddleware,transactionController.createTransaction)

router.post("/system/initial-funds", authSystemUserMiddleware, transactionController.createInitialFundsTransaction)

module.exports = router 