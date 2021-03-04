const { cloudinary } = require('../utils/cloudinary');

const uploadImg = async file => {
    try {
        const uploadedResponse = await cloudinary.uploader.upload(file, {
            upload_preset: 'dev_setups'
        });

        return uploadedResponse.url;
    } catch (error) {
        console.log(error);

        return '';
    }
}

module.exports = {
    uploadImg
}
