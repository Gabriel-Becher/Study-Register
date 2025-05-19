const CellService = require('../services/cellService');

class CellController {

    async getAllCellsFromWorkspace(req, res) {
        const { status, errors, data } = await CellService.getAllCellsFromWorkspace(
            req.params.workspaceId
        );
        return res.status(status).json({ errors, data });
    }

    async getCellById(req, res) {
        const { status, errors, data } = await CellService.getCellById(req.params.cellId);
        if (status === 200) {
            return res.status(status).json({ errors, data });
        }
        return res.status(status).json({ errors, data });
    }

    async createCell(req, res) {
        const { status, errors, data } = await CellService.createCell(req.body);
        return res.status(status).json({ errors, data });
    }

    async updateCell(req, res) {
        const { status, errors, data } = await CellService.updateCell(
            req.params.cellId,
            req.body
        );
        return res.status(status).json({ errors, data });
    }

    async deleteCell(req, res) {
        const { status, errors, data } = await CellService.deleteCell(req.params.cellId);
        return res.status(status).json({ errors, data });
    }

}

module.exports = new CellController();