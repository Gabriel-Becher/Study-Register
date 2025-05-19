const Textfield = require('../models/Textfield');

class TextfieldService {

    static async getCellTextfields(cellId) {
        if(!cellId) {
            return {status: 400, errors: ["cellId is required"], data: []}
        }
        try {
            const textfields = await Textfield.findAll({
                where: { cell_id: cellId },
            });
            if(!textfields) {
                return {status: 204, errors: [], data: []}
            }
            return {status: 200, errors: [], data: textfields}
        
        }catch(error) {
            return {status: 500, errors: error.errors?.map((x) => {
                x.message;
            }) ?? ["Error fetching textfields"], data: []}
        }
    }

    static async getTextfieldById(textfieldId) {
        if(!textfieldId) {
            return {status: 400, errors: ["textfieldId is required"], data: []}
        }
        try {
            const textfield = await Textfield.findByPk(textfieldId);
            if(!textfield) {
                return {status: 204, errors: [], data: []}
            }
            return {status: 200, errors: [], data: textfield}
        
        }catch(error) {
            return {status: 500, errors: error.errors?.map((x) => {
                x.message;
            }) ?? ["Error fetching textfield"], data: []}
        }
    }

    static async createTextfield(textfieldData) {
        if(!textfieldData.cell_id) {
            return {status: 400, errors: ["cell_id is required"], data: []}
        }
        try {
            const textfield = Textfield.create(textfieldData);
            if(!textfield) {
                return {status: 204, errors: [], data: []}
            }
            return {status: 200, errors: [], data: textfield}
        
        }catch(error) {
            return {status: 500, errors: error.errors?.map((x) => {
                x.message;
            }) ?? ["Error creating textfield"], data: []}
        }
    }

    static async updateTextfield(textfieldId, textfieldData) {
        if(!textfieldId) {
            return {status: 400, errors: ["textfieldId is required"], data: []}
        }
        try {
            const textfield = await Textfield.findByPk(textfieldId);
            if(!textfield) {
                return {status: 204, errors: ["Textfield not found"], data: []}
            }
            await textfield.update(textfieldData);
            return {status: 200, errors: [], data: textfield}
        
        }catch(error) {
            return {status: 500, errors: error.errors?.map((x) => {
                x.message;
            }) ?? ["Error updating textfield"], data: []}
        }
    }        

    static async deleteTextfield(textfieldId) {
        if(!textfieldId) {
            return {status: 400, errors: ["textfieldId is required"], data: []}
        }
        try {
            const textfield = await Textfield.findByPk(textfieldId);
            if(!textfield) {
                return {status: 204, errors: ["Textfield not found"], data: []}
            }
            await textfield.destroy();
            return {status: 200, errors: [], data: []}
        
        }catch(error) {
            return {status: 500, errors: error.errors?.map((x) => {
                x.message;
            }) ?? ["Error deleting textfield"], data: []}
        }
    }

}

module.exports = TextfieldService