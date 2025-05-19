const imageService = require('../services/imageService');

const multer = require('multer');

const multerConfig = require("../config/multerConfig")

const upload = multer(multerConfig).single('image');

const Image = require("../models/Image");

class ImageController {
    async getCellImages(req, res) {
        const { cell_id } = req.params;
        const { status, errors, data } = await imageService.getCellImages(cell_id);
        return res.status(status).json({ errors, data });
    }

    async getImageById(req, res) {
        const { imageId } = req.params;
        const { status, errors, data } = await imageService.getImageById(imageId);
        return res.status(status).json({ errors, data });
    }

    async uploadImage(req, res) {
        return upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    status: 400, errors: [err.code], data: []
                });
            }
            try {
                const { filename } = req.file;
                const { cell_id } = req.body;
                await Image.create({ filename, cell_id });
                return res.status(201).json({errors:[], data:[]});
            } catch (error) {
                console.log(error)
                return res.status(500).json(
                    {errors: error.errors?.map((x) => {
                            x.message;
                        }) ?? ["Error uploading image"], data: []
                    }
                );
            }
        });
    }

    async deleteImage(req, res) {
        const { imageId } = req.params;
        const { status, errors, data } = await imageService.deleteImage(imageId);
        return res.status(status).json({ errors, data });
    }
}

module.exports = new ImageController();