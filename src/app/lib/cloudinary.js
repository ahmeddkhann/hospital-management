import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_SECRET_key
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null 

        // uploading file on cloudinary
       const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        fs.unlinkSync(localFilePath)
        return response
      }

       catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved file if uploading on cloudinary failed
        return null
    }
}
 export {uploadOnCloudinary}