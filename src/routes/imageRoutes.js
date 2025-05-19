const {Router} = require('express');

const imageController = require('../controllers/imageController');

const router = Router();

router.get('/cell/:cell_id', imageController.getCellImages);

router.get('/:imageId', imageController.getImageById);

router.post('/upload', imageController.uploadImage);

router.delete('/:imageId', imageController.deleteImage);

module.exports = router;