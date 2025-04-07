const express = require('express');
const router = express.Router();
const multer = require('multer');
const templateController = require('../controllers/templateController');
const { verifyToken, checkRole } = require('../middleware/auth');



const storage = multer.memoryStorage(); 

const upload = multer({ 
                storage: storage,
                limits: {
                    fileSize:10*1024*1024 , // 10 MB max allowed
                },
          }); 


router.post('/', verifyToken,checkRole(['admin']), upload.single('thumbnail'), templateController.createTemplate);
router.put('/:id',verifyToken ,checkRole(['admin']),upload.single('thumbnail'), templateController.updateTemplate);

router.get('/:id', templateController.getTemplateById);
router.get('/', templateController.getAllTemplates);

router.put('/restore/:id', verifyToken,checkRole(['admin']), templateController.restoreTemplate);




router.delete('/:id', verifyToken,checkRole(['admin']), templateController.deleteTemplate);

module.exports = router;
