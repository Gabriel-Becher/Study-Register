const fs = require('fs');

const path = require('path');

const Image = require("../models/Image");

class ImageService {

    static async getCellImages(cellId) {
        if(!cellId) {
            return {status: 400, errors: ["cell_id is required"], data: []}
        }
        try {
            const images = await Image.findAll({
                attributes: ['id', 'url', 'filename'],
                where: { cell_id: cellId },
            });
            if(!images) {
                return {status: 204, errors: [], data: []}
            }
            return {status: 200, errors: [], data: images}
        
        }catch(error) {
            return {status: 500, errors: error.errors?.map((x) => {
                x.message;
            }) ?? ["Error fetching images"], data: []}
        }}
    
    static async getImageById(imageId) {
        if(!imageId) {
            return {status: 400, errors: ["image_id is required"], data: []}
        }
        try {
            const image = await Image.findByPk(imageId);
            if(!image) {
                return {status: 204, errors: [], data: []}
            }
            return {status: 200, errors: [], data: image}
        }catch(error) {
            return {status: 500, errors: error.errors?.map((x) => {
                x.message;
            }) ?? ["Error fetching image"], data: []}
        }
    }


    static async deleteImage(imageId) {
        if(!imageId) {
            return {status: 400, errors: ["image_id is required"], data: []}
        }
        try {
            const image = await Image.findByPk(imageId);
            const filepath = path.resolve(__dirname, '..', '..', 'uploads','images', image.filename);
            await fs.unlink(filepath, (err) => {
                if (err) {
                    console.error(err);
                    return {status: 500, errors: ["Error deleting image"], data: []}
                }
            });
            await image.destroy();
            if(!image) {
                return {status: 204, errors: [], data: []}
            }
            return {status: 200, errors: [], data: image}
        
        }catch(error) {
            console.log(error)
            return {status: 500, errors: error.errors?.map((x) => {
                x.message;
            }) ?? ["Error deleting image"], data: []}
        }
    }

}

module.exports = ImageService;