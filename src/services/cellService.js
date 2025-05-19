const Cell = require('../models/Cell');
const Textfield = require('../models/Textfield');
const Image = require('../models/Image');

class CellService {
    static async getAllCellsFromWorkspace(workspaceId) {
        if (!workspaceId) {
            return { status: 400, errors: ['Workspace ID is required'], data: [] };
        }
        try {
            const cells = await Cell.findAll({
                include: [
                {
                    model: Textfield,
                    attributes: ['id', 'text', 'position'],
                },
                {
                    model: Image,
                    attributes: ['id', 'url', 'position', "filename"],
                },
                {
                    model: Cell,
                    as: 'subcells',
                    attributes: ['id', 'position', 'weight', 'done'],
                },
                ],
                where: {
                    workspace_id: workspaceId,
                },
            });
            if (!cells || cells.length === 0) {
                return { status: 404, errors: ['No cells found'], data: [] };
            }
            return { status: 200, errors: [], data: cells };
        } catch (error) {
            console.log(error)
            return {
                status: 500,
                errors: error.errors?.map((x) => x.message) ?? ['Error fetching cells'],
                data: [],
            };
        }
    }

    static async getCellById(cellId) {
        if (!cellId) {
            return { status: 400, errors: ['Cell ID is required'], data: [] };
        }
        try {
            const cell = await Cell.findByPk(cellId, {
                include: [
                    {
                        model: Textfield,
                        attributes: ['id', 'text', 'position'],
                    },
                    {
                        model: Image,
                        attributes: ['id', 'url', 'position', "filename"],
                    },
                    {
                        model: Cell,
                        as: 'subcells',
                        attributes: ['id', 'position', 'weight', 'done'],
                    },
                ],
            });
            if (!cell) {
                return { status: 404, errors: ['Cell not found'], data: [] };
            }
            return { status: 200, errors: [], data: cell };
        } catch (error) {
            return {
                status: 500,
                errors: error.errors?.map((x) => x.message) ?? ['Error fetching cell'],
                data: [],
            };
        }
    }

    static async createCell(cellData) {
        if(!cellData.workspace_id == !cellData.parent_id){
            return { status: 400, errors: ['Workspace id OR Parent id are required'], data: [] };
        }
        try {
            const cell = await Cell.create({
                ...cellData
            });
            return { status: 201, errors: [], data: cell };
        } catch (error) {
            console.log(error)
            return {
                status: 500,
                errors: error.errors?.map((x) => x.message) ?? ['Error creating cell'],
                data: [],
            };
        }
    }

    static async updateCell(cellId, cellData) {
        if (!cellId) {
            return { status: 400, errors: ['Cell ID is required'], data: [] };
        }
        try {
            const cell = await Cell.findByPk(cellId);
            if (!cell) {
                return { status: 404, errors: ['Cell not found'], data: [] };
            }

            for (const key in cellData) {
                if (key in cell) {
                if (key === "id") {
                    return {
                    status: 401,
                    errors: ["Cell ID cannot be updated"],
                    data: [],
                    };
                }
                cell[key] = cellData[key];
                }
            }

            await cell.update(cellData);
            return { status: 200, errors: [], data: cell };
        } catch (error) {
            return {
                status: 500,
                errors: error.errors?.map((x) => x.message) ?? ['Error updating cell'],
                data: [],
            };
        }
    }

    static async deleteCell(cellId) {
        if (!cellId) {
            return { status: 400, errors: ['Cell ID is required'], data: [] };
        }
        try {
            const cell = await Cell.findByPk(cellId);
            if (!cell) {
                return { status: 404, errors: ['Cell not found'], data: [] };
            }
            await cell.destroy();
            return { status: 200, errors: [], data: [] };
        } catch (error) {
            return {
                status: 500,
                errors: error.errors?.map((x) => x.message) ?? ['Error deleting cell'],
                data: [],
            };
        }
    }

}

module.exports = CellService;