import dbConnect from "@/app/lib/databaseConnection";
import userModel from "@/app/models/userSchema";


export async function GET (request){
   try {
   await dbConnect()
     const user = await userModel.find({role: "Patient"})
     return Response.json(
         {
             success: true,
             message: "  Patients retrieved successfully",
             user
         },
         {status: 200}
     )
   } catch (error) {
     console.log("error while getting patients", error);
     return Response.json(
        {
            success: false,
            message: "Error while getting patients",
        },
        {status: 500}
     )
     
   }
}