import dbConnect from "@/app/lib/databaseConnection"
import userModel from "@/app/models/userSchema"


export async function POST (request){
   await dbConnect()
    const {firstName, lastName, email, phone,
         password, gender, dob, cnic, role} = await request.json()

         if (
            !firstName || !lastName || !email || !phone ||
         !password || !gender || !dob || !cnic || !role
         ){
            return Response.json(
               {
                  success: "false",
                  message: "Please fill all the forms to signup"
               },
               {status: 402}
            )
         }

         const user = await userModel.findOne({email})
         if (user){
            return Response.json(
               {
                  success: "false",
                  message: `${role} with email ${email} already exists! Please try again with new email`
               },
               {status: 401}
            )
         } 

         const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            phone,
            password,
            gender,
            dob,
            cnic,
            role
         })

         await newUser.save()
         return Response.json(
            {
               success: "true",
               message: "User Registered successfully",
            },
            {status: 200}
         )
}