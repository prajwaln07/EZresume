// server/routes/templateRoutes.js
const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Admin-only routes for managing templates
router.post('/', checkRole(['admin']), templateController.createTemplate);
router.put('/:id', checkRole(['admin']), templateController.updateTemplate);
router.delete('/:id', checkRole(['admin']), templateController.deleteTemplate);

module.exports = router;
