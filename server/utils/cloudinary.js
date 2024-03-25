import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name :process.env.CLOUDINARY_CLOUD_NAME ,
    api_key :process.env.CLOUDINARY_API_KEY ,
    api_secret :process.env.CLOUDINARY_API_SECRET ,
})

const cloudinaryUploadImage = async (filePath) => {
    try {
        const data = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
        });
        return data;
    } catch (err) {
        console.error(err.message);
        throw new Error("Internal server error(cloudinary)");
    }
};

//cloudinary remove image
const cloudinaryRemoveImage= async (imagePublicId)=>{
    try{
        const result= await cloudinary.uploader.destroy(imagePublicId)
        return result;
    }catch(err){
        console.error(err.message);
        throw new Error("Internal server error(cloudinary)");
    }
}

//cloudinary remove many images
const cloudinaryRemoveManyImages= async (publicIds)=>{  //array of images public id
    try{
        const result= await cloudinary.v2.api.delete_resources(publicIds);
        return result;
    }catch(err){
        console.error(err.message);
        throw new Error("Internal server error(cloudinary)");
    }
}

export {cloudinaryUploadImage,cloudinaryRemoveImage,cloudinaryRemoveManyImages}