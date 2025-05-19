const { Router } = require('express');
const CellController = require('../controllers/cellController');

const router = Router();

router.get('/:cellId', CellController.getCellById);
router.get('/workspace/:workspaceId', CellController.getAllCellsFromWorkspace);
router.post('/', CellController.createCell);
router.put('/:cellId', CellController.updateCell);
router.delete('/:cellId', CellController.deleteCell);

module.exports = router;