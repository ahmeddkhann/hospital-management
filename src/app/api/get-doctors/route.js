import userModel from "@/app/models/userSchema"
import dbConnect from "@/app/lib/databaseConnection"

export async function GET (){
  try {
      await dbConnect()
      const doctors = await userModel.find({role: "Doctor"})
      return Response.json(
          {
              success: true,
              doctors
          },
          {status: 200}
      )
  } catch (error) {
    console.log("error while getting the doctors", error);
    return Response.json(
        {
            success: false,
            message: "Error while getting the doctors"
        },
        {status: 500}
    ) 
  }
}