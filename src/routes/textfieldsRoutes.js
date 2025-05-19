const { Router } = require('express');

const textfieldController = require('../controllers/textfieldController');

const router = Router();

router.get('/cell/:cellId', textfieldController.getCellTextfields);
router.get('/:textfieldId', textfieldController.getTextfieldById);
router.post('/', textfieldController.createTextfield);
router.put('/:textfieldId', textfieldController.updateTextfield);
router.delete('/:textfieldId', textfieldController.deleteTextfield);

module.exports = router;