import userModel from "@/app/models/userSchema";
import dbConnect from "@/app/lib/databaseConnection";

export async function POST (request){
    try {
        await dbConnect()
        const {firstName, lastName, email, phone,
             password, gender, dob, cnic} = await request.json()
    
             if (
                !firstName || !lastName || !email || !phone ||
             !password || !gender || !dob || !cnic
             ){
                return Response.json(
                    {
                        success: false,
                        message: "fill all the fields"
                    },
                    {status: 404}
                )
             }
    
             const registeredUser = await userModel.findOne({email})
             if (registeredUser){
                return Response.json(
                    {
                        success: false,
                        message: `${registeredUser.role} with ${email} email already exists`
                    },
                    {status: 402}
                )
             }
    
             const newAdmin = await userModel.create({
                firstName,
                lastName,
                email,
                phone,
                password,
                gender,
                dob,
                cnic,
                role: "Admin"
             })
    
             await newAdmin.save()

             return Response.json(
                {
                    success: true,
                    message: `admin created successfully`,
                },
                {status: 200}
             )
    }
    catch (error) {
        console.log("error while creating new admin", error);
        return Response.json(
            {
                success: false,
                message: "error while creating new admin"
            },
            {status: 500}
        )
   
    }
  } 