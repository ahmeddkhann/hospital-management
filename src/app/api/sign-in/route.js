import userModel from "@/app/models/userSchema";
import dbConnect from "@/app/lib/databaseConnection";

export async function POST (request){
   try {
    await dbConnect()
     const {email, password, confirmPassword, role} = await request.json()
 
     if (!email || !password || !confirmPassword || !role){
         return Response.json(
             {
                 success: false,
                 message: "Please fill in all fields to login"
             },
             {status: 404}
         )
     }
 
     if (password !== confirmPassword){
         return Response.json(
             {
                 success: false,
                 message: "Password and confirm Password do not match"
             },
             {status: 403}
         )
     }
 
     const user = await userModel.findOne({email}).select("+password")
     if (!user){
         return Response.json(
             {
                 success: false,
                 message: `${role} with email "${email}" is not found`
             },
             {status: 402}
         )
     }
 
     const isPasswordCorrect = await user.comparePassword(password)
     if (!isPasswordCorrect){
         return Response.json(
             {
                 success: false,
                 message: "Password is incorrect"
             },
             {status: 404}
         )
     }
 
     if (role !== user.role){
         return Response.json(
             {
                 success: false,
                 message: "the role you are trying to login is not for you"
             },
             {status: 402}
         )
     }
     return Response.json(
         {
             success: true,
             message: " user loggedIn successfully",
         },
         {status: 200}
     )
 }
 catch (error) {
    console.log("error while logging in user: ", error);
   return Response.json (
    {
        success: false,
        message: "error while logging in user"
    },
    {status: 500}
   )
 }
   } 