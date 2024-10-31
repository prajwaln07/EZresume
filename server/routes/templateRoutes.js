// server/routes/templateRoutes.js
const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Admin-only routes for managing templates
router.post('/', verifyToken, checkRole(['admin']), templateController.createTemplate);
router.put('/:id', verifyToken, checkRole(['admin']), templateController.updateTemplate);
router.delete('/:id', verifyToken, checkRole(['admin']), templateController.deleteTemplate);

module.exports = router;
