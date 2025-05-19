const textfieldService = require('../services/textfieldService');

class TextfieldController {

    async getCellTextfields(req, res) {
        const { cellId } = req.params;
        const { status, errors, data } = await textfieldService.getCellTextfields(cellId);
        return res.status(status).json({ errors, data });
    }

    async getTextfieldById(req, res) {
        const { textfieldId } = req.params;
        const { status, errors, data } = await textfieldService.getTextfieldById(textfieldId);
        return res.status(status).json({ errors, data });
    }

    async createTextfield(req, res) {
        const textfieldData = req.body;
        const { status, errors, data } = await textfieldService.createTextfield(textfieldData);
        return res.status(status).json({ errors, data });
    }

    async updateTextfield(req, res) {
        const { textfieldId } = req.params;
        const textfieldData = req.body;
        const { status, errors, data } = await textfieldService.updateTextfield(textfieldId, textfieldData);
        return res.status(status).json({ errors, data });
    }

    async deleteTextfield(req, res) {
        const { textfieldId } = req.params;
        const { status, errors, data } = await textfieldService.deleteTextfield(textfieldId);
        return res.status(status).json({ errors, data });
    }

}

module.exports = new TextfieldController();