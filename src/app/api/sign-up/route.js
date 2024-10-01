import userModel from "@/app/models/userSchema"


export async function POST (request){
    const {firstName, lastName, email, phone,
         password, gender, dob, cnic, role} = await request.json()

         if (
            !firstName || !lastName || !email || !phone ||
         !password || !gender || !dob || !cnic || !role
         ){
            return Response.json(
               {
                  success: "false",
                  message: "Please fill all the forms"
               },
               {status: 402}
            )
         }

         const user = await userModel.findOne({email})
         if (user){
            return Response.json(
               {
                  success: "false",
                  message: "User with this email already exists! Please try again with new email"
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