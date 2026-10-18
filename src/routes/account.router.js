const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const accountController = require('../controllers/account.controller');


const router = express.Router()



router.post('/',authMiddleware,accountController.createAccountController);

/**
 * - GET /api/accounts/
 * - Get all accounts of the logged-in user
 * - Protected Route
 */
router.get("/", authMiddleware, accountController.getUserAccountsController)


/**
 * - GET /api/accounts/balance/:accountId
 */
router.get("/balance/:accountId", authMiddleware, accountController.getAccountBalanceController)

module.exports = router;