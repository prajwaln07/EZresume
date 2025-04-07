const express = require('express');
const {getSuggestions} = require('../controllers/resumeController');
const router = express.Router();

router.post('/suggestion',getSuggestions);
module.exports = router;



