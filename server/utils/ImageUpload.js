const cloudinary = require('cloudinary').v2;

exports.uploadImageToloudinary = async (file,folder,height,quaity) => {
    const options = {folder};
    if(height){
        options.height = height;
    }
    if(quaity){
        options.quality = quaity;
    }
    options.resource_type = 'auto';
    return await cloudinary.uploader.upload(file.tempFilePath,options);
};