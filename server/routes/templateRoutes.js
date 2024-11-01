// server/routes/templateRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const templateController = require('../controllers/templateController');
const { verifyToken, checkRole } = require('../middleware/auth');

const storage = multer.memoryStorage(); // Store files in memory (or specify a disk storage location)
const upload = multer({ storage: storage }); // Initialize multer with storage

// Admin-only routes for managing templates
router.post('/', checkRole(['admin']), upload.single('thumbnail'), templateController.createTemplate);
router.put('/:id', checkRole(['admin']), templateController.updateTemplate);
router.get('/:id', checkRole(['admin']), templateController.getTemplateById);
router.get('/', checkRole(['admin']), templateController.getAllTemplates);
router.delete('/:id', checkRole(['admin']), templateController.deleteTemplate);

module.exports = router;
