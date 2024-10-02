import dbConnect from "@/app/lib/databaseConnection"
import userModel from "@/app/models/userSchema"
import bcrypt from "bcrypt"
export async function isAdminAuthentic (request){
    try {
      await dbConnect()
  
      const {email, password, role} = await request.json()
  
      if (!email || !password, !role){
          return Response.json(
              {
                  success: false,
                  message: "all fields are required"
              },
              {status: 404}
          )
      }
  
      const oldAdmin = await userModel.findOne({email})
      if (!oldAdmin){
          return Response.json(
              {
                  success: false,
                  message: `${oldAdmin.role} with email ${email} is not found`
              },
              {status: 405}
          )
      }
      const checkPassword = await bcrypt.compare(password, oldAdmin.password)
      if (!checkPassword){
          return Response.json(
              {
                  success: false,
                  message: "Incorrect Password"
              },
              {status: 404}
          )
      }
      if (oldAdmin.role !== "Admin") {
          return Response.json(
              {
                  success: false,
                  message: "You are not authentic for this operation"
              },
              {status: 403}
          )
      }
 
    } catch (error) {
     console.log("error while authenticating the current admin", error);
     return Response.json(
         {
             success: false,
             message: "error while authenticating the current admin"
         },
         {
             status: 500,
         }
     )
     
    }
 }