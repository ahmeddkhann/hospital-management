import userModel from "@/app/models/userSchema";
import dbConnect from "@/app/lib/databaseConnection";
import cloudinary from "@/app/lib/cloudinary";

export async function POST (request){
    await dbConnect()
    try {
        const {firstName, lastName, email, phone,
             password, gender, dob, cnic, doctorDepartment} = await request.json()
    const requestData = await request.text();
console.log("Request Data:", requestData);

        if (!request.files || Object.keys(request.files).length === 0){
            return Response.json(
                {
                    success: false,
                    message: "Doctor avatar is Required"
                },
                {status: 400}
            )
        }     
    
        const {docAvatar} = request.files
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"]
        if (!allowedFormats.includes(docAvatar.mimetype)){
            return Response.json(
                {
                    success: false,
                    message: "Invalid image format. Only PNG, JPEG and WEBP are allowed"
                },
                {status: 401}
            )
        }
    
        if (!firstName || !lastName || !email || !phone ||
            !password || !gender || !dob || !cnic || !doctorDepartment){
                return Response.json(
                    {
                        success: false,
                        message: "All fields are required"
                    },
                    {status: 404}
                )
            }
    
          const isRegistered = await userModel.findOne({email})
          
          if (isRegistered){
            return Response.json(
                {
                    success: false,
                    message: `Doctor with email ${email} is already registered`
                },
                {status: 403}
            )
          }
    
          const cloudinaryResponse = await cloudinary.uploader.upload(
            docAvatar.tempFilePath
          )
          if (!cloudinaryResponse || cloudinaryResponse.error){
            console.log("error while uploading doctor avatar", error);
            return Response.json(
                {
                    success: false,
                    message: "Failed to upload doctor avatar"
                },
                {status: 402}
            )
          }
    
          const doctor = await userModel.create({
            firstName,
            lastName,
            email,
            phone,
            password,
            gender,
            dob,
            cnic,
            doctorDepartment,
            role: "Doctor",
            docAvatar: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }
          })
          await doctor.save()

    
          return Response.json(
            {
                success: true,
                message: `Doctor with email ${email} is registered successfully`,
            },
            {status: 200}
          )
    } catch (error) {
        console.log("error while adding new doctor", error);
        return Response.json(
            {
                success: false,
                message: "Doctor Registeration Failed !!"
            },
            {status: 501}
        )
    }
}